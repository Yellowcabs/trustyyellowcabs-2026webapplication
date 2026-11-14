
export const appendBookingToSheet = async (bookingDetails: any) => {
  try {
    const response = await fetch('/api/save-booking', {
      method: 'POST',
      keepalive: true,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...bookingDetails,
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      }),
    });

    if (!response.ok) {
      throw new Error(`Google Sheets API returned ${response.status}`);
    }

    return { status: 'sent' };
  } catch (error) {
    console.error('Error saving to Google Sheet:', error);
  }
};
