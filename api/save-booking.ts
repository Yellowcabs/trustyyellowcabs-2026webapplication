import { isIP } from 'node:net';

const MAX_PAYLOAD_BYTES = 64 * 1024;
const WRITE_TIMEOUT_MS = 10_000;
const IDEMPOTENCY_WINDOW_MS = 10 * 60 * 1000;
type WriteResult = 'sent' | 'failed' | 'unknown';

const inFlightWrites = new Map<string, Promise<WriteResult>>();
const completedWrites = new Map<string, number>();

type BookingPayload = Record<string, unknown>;

const getHeader = (headers: Record<string, unknown>, name: string) => {
  const value = headers[name] ?? headers[name.toLowerCase()];
  return Array.isArray(value) ? value[0] : value;
};

const getTrustedClientIp = (headers: Record<string, unknown>) => {
  const forwardedFor = getHeader(headers, 'x-forwarded-for');
  const realIp = getHeader(headers, 'x-real-ip');
  const candidates = [
    ...(typeof realIp === 'string' ? [realIp] : []),
    ...(typeof forwardedFor === 'string' ? forwardedFor.split(',') : []),
  ];

  for (const candidate of candidates) {
    const ip = candidate.trim();
    if (isIP(ip)) return ip;
  }

  return '';
};

const parsePayload = (body: unknown): BookingPayload | null => {
  let payload = body;

  if (typeof payload === 'string') {
    try {
      payload = JSON.parse(payload);
    } catch {
      return null;
    }
  }

  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return null;

  const serialized = JSON.stringify(payload);
  if (new TextEncoder().encode(serialized).byteLength > MAX_PAYLOAD_BYTES) return null;

  return payload as BookingPayload;
};

const writeToGoogleScript = async (scriptUrl: string, payload: BookingPayload, customerIp: string): Promise<WriteResult> => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), WRITE_TIMEOUT_MS);

  try {
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ ...payload, customerIp }),
      signal: controller.signal,
    });

    if (!response.ok) {
      console.error('booking_sheet_write_failed', { status: response.status });
      return 'failed';
    }

    // Only an explicit success response is proof that Apps Script saved the
    // row. Empty/plain 2xx responses remain unknown so the client checks the
    // same leadId instead of confirming prematurely.
    const responseText = await response.text();
    if (!responseText.trim()) return 'unknown';

    try {
      const result = JSON.parse(responseText);
      if (
        result?.ok === false ||
        result?.success === false ||
        result?.status === 'failed' ||
        result?.status === 'error'
      ) {
        return 'failed';
      }
      if (
        result?.ok === true ||
        result?.success === true ||
        result?.saved === true ||
        result?.status === 'sent' ||
        result?.status === 'saved' ||
        result?.status === 'success'
      ) {
        return 'sent';
      }
      return 'unknown';
    } catch {
      return 'unknown';
    }
  } catch (error: any) {
    const timedOut = error?.name === 'AbortError';
    console.error(timedOut ? 'booking_sheet_write_unknown_timeout' : 'booking_sheet_write_unknown_network');
    return 'unknown';
  } finally {
    clearTimeout(timeout);
  }
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).setHeader('Allow', 'POST').json({ error: 'Method not allowed' });
    return;
  }

  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
  const payload = parsePayload(req.body);

  if (!scriptUrl) {
    res.status(503).json({ error: 'Google Sheets service is not configured' });
    return;
  }

  if (!payload) {
    res.status(400).json({ error: 'Invalid booking payload' });
    return;
  }

  const { customerIp: _browserSuppliedIp, ...bookingPayload } = payload;
  const customerIp = getTrustedClientIp(req.headers || {});
  const bookingId = typeof bookingPayload.leadId === 'string' ? bookingPayload.leadId : '';
  const now = Date.now();

  for (const [id, completedAt] of completedWrites) {
    if (now - completedAt > IDEMPOTENCY_WINDOW_MS) completedWrites.delete(id);
  }

  if (bookingId && completedWrites.has(bookingId)) {
    res.status(200).json({ status: 'sent' });
    return;
  }

  let write = bookingId ? inFlightWrites.get(bookingId) : undefined;
  if (!write) {
    write = writeToGoogleScript(scriptUrl, bookingPayload, customerIp);
    if (bookingId) inFlightWrites.set(bookingId, write);
  }

  try {
    const result = await write;
    if (result === 'unknown') {
      res.status(504).json({ status: 'unknown', error: 'Booking data service status is unknown' });
      return;
    }
    if (result === 'failed') {
      res.status(502).json({ status: 'failed', error: 'Google Sheets write failed' });
      return;
    }

    if (bookingId) completedWrites.set(bookingId, Date.now());
    res.status(200).json({ status: 'sent' });
  } finally {
    if (bookingId) inFlightWrites.delete(bookingId);
  }
}
