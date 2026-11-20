const MAX_BODY_BYTES = 20_000;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
  const booking = req.body;
  if (!scriptUrl || !booking || typeof booking !== 'object' || JSON.stringify(booking).length > MAX_BODY_BYTES) {
    res.status(400).json({ error: 'Booking data is invalid' });
    return;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    const response = await fetch(scriptUrl, {
      method: 'POST',
      signal: controller.signal,
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({
        ...booking,
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      }),
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      res.status(502).json({ status: 'failed', error: 'Booking data could not be saved' });
      return;
    }

    const responseText = await response.text();
    try {
      const result = JSON.parse(responseText);
      if (result?.ok === false || result?.success === false) {
        res.status(502).json({ status: 'failed', error: 'Booking data could not be saved' });
        return;
      }
    } catch {
      // Existing Apps Script deployments may return an empty or non-JSON 2xx response.
    }

    res.status(200).json({ status: 'sent', ok: true });
  } catch {
    res.status(504).json({ status: 'unknown', error: 'Booking data service status is unknown' });
  }
}
