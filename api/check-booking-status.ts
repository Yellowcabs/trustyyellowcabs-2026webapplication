export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.status(405).json({ status: 'unknown', error: 'Method not allowed' });
    return;
  }

  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
  const bookingId = typeof req.query?.bookingId === 'string' ? req.query.bookingId.trim() : '';
  if (!scriptUrl || !bookingId || bookingId.length > 120) {
    res.status(400).json({ status: 'unknown', error: 'Booking ID is invalid' });
    return;
  }

  try {
    const url = new URL(scriptUrl);
    url.searchParams.set('action', 'check');
    url.searchParams.set('leadId', bookingId);
    const response = await fetch(url.toString(), {
      method: 'GET',
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      res.status(502).json({ status: 'unknown', error: 'Booking status unavailable' });
      return;
    }

    const text = await response.text();
    try {
      const result = JSON.parse(text);
      if (result?.exists === true || result?.status === 'sent' || result?.status === 'saved') {
        res.status(200).json({ status: 'sent' });
        return;
      }
      if (result?.exists === false || result?.status === 'failed' || result?.status === 'not_found') {
        res.status(200).json({ status: 'failed' });
        return;
      }
    } catch {
      // An existing Apps Script without a JSON status response cannot confirm persistence.
    }

    res.status(200).json({ status: 'unknown' });
  } catch {
    res.status(504).json({ status: 'unknown', error: 'Booking status unavailable' });
  }
}
