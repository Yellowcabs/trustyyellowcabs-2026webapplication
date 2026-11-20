export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.BREVO_API_KEY;
  const emailContent = req.body?.emailContent;

  if (!apiKey || !emailContent || typeof emailContent !== 'object' || Array.isArray(emailContent)) {
    res.status(400).json({ error: 'Email service is not configured' });
    return;
  }

  const subject = emailContent.subject;
  const htmlContent = emailContent.htmlContent;
  if (typeof subject !== 'string' || subject.length === 0 || subject.length > 300 ||
      typeof htmlContent !== 'string' || htmlContent.length === 0 || htmlContent.length > 50_000) {
    res.status(400).json({ error: 'Booking email data is invalid' });
    return;
  }

  // Keep delivery fixed to the configured mailbox even if an untrusted caller
  // submits a forged sender or recipient object.
  const safeEmailContent = {
    subject,
    htmlContent,
    sender: { name: 'TrustyYellowCabs Booking', email: 'trustyyellowcabs@gmail.com' },
    to: [{ email: 'trustyyellowcabs@gmail.com', name: 'TrustyYellowCabs Admin' }],
  };

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify(safeEmailContent),
    });

    if (!response.ok) {
      res.status(response.status).json({ error: 'Booking email could not be sent' });
      return;
    }

    res.status(200).json({ ok: true });
  } catch {
    res.status(502).json({ error: 'Booking email service unavailable' });
  }
}
