
export const appendBookingToSheet = async (bookingDetails: any) => {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch('/api/save-booking', {
      method: 'POST',
      keepalive: true,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...bookingDetails,
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      }),
    });
    let payload: { status?: string } = {};
    try {
      payload = await response.json();
    } catch {
      payload = {};
    }
    if (!response.ok) {
      return { status: payload.status === 'unknown' ? 'unknown' : 'failed' } as const;
    }
    return { status: payload.status === 'sent' ? 'sent' : 'unknown' } as const;
  } catch {
    return { status: 'unknown' } as const;
  } finally {
    window.clearTimeout(timeoutId);
  }
};

export const checkBookingPersistence = async (bookingId?: string) => {
  if (!bookingId) return { status: 'unknown' } as const;
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch('/api/check-booking-status?bookingId=' + encodeURIComponent(bookingId), {
      method: 'GET',
      cache: 'no-store',
      signal: controller.signal,
    });
    const payload = await response.json() as { status?: string };
    if (payload.status === 'sent' || payload.status === 'saved') return { status: 'sent' } as const;
    if (payload.status === 'failed') return { status: 'failed' } as const;
    return { status: 'unknown' } as const;
  } catch {
    return { status: 'unknown' } as const;
  } finally {
    window.clearTimeout(timeoutId);
  }
};

// A write response can be lost after Apps Script has appended the row. Polling
// the existing status endpoint avoids a blind second write in that case.
export const confirmBookingPersistence = async (bookingId?: string) => {
  const delays = [0, 1000, 2000];
  for (const delay of delays) {
    if (delay) await new Promise(resolve => window.setTimeout(resolve, delay));
    const status = await checkBookingPersistence(bookingId);
    if (status.status !== 'unknown') return status;
  }
  return { status: 'unknown' } as const;
};
