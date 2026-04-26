import { BookingDetails } from '../types';

export const sendBookingEmail = async (details: BookingDetails): Promise<boolean> => {
  const apiKey = import.meta.env.VITE_BREVO_API_KEY;

  if (!apiKey) {
    console.error("API configuration is missing. Please ensure the environment is correctly set up.");
    return false;
  }

  const url = "https://api.brevo.com/v3/smtp/email";

  // Format schedule in 12-hour IST
  const scheduleIST = new Date(details.date + ' ' + details.time).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  // Telegram message (clean & spaced)
  const tgMessage = encodeURIComponent(
`🚖 *New Booking Request*

*Phone:* ${details.phone}

*Pickup:* [${details.pickup}](https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(details.pickup)})
*Drop:* [${details.drop}](https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(details.drop)})

*Vehicle:* ${details.vehicleType}
*Fare:* ${details.estimatedFare || 'Manual Quote'}
*Distance:* ${details.distance || 'N/A'}
*Schedule (IST):* ${scheduleIST}

Please contact the customer if needed.`
  );
  const tgLink = `https://t.me/share/url?url=&text=${tgMessage}`;

  // WhatsApp message
const rawPhone = details.phone.replace(/\D/g, '');

// Ensure India country code
const phoneWithCountryCode = rawPhone.startsWith('91')
  ? rawPhone
  : `91${rawPhone}`;

const waMessage = encodeURIComponent(
`👋 Hi / வணக்கம்!

🚖 *Trusty Yellow Cabs* — Your Ride Partner

📍 Need a taxi anytime?
Just open:
👉 https://trustyyellowcabs.in

📲 Easy to book:
Add this website to your Home Screen.
Next time — book in just one tap 👍

🛡️ Safe • On-time • Easy Booking

Whenever you need a ride,
we are just one tap away`
);

const waLink = `https://wa.me/${phoneWithCountryCode}?text=${waMessage}`;


  const emailContent = {
    sender: { name: "Trustyyellowcabs Booking", email: "trustyyellowcabs@gmail.com" },
    to: [{ email: "trustyyellowcabs@gmail.com", name: "Trustyyellowcabs Admin" }],
    subject: `Booking Request: ${details.pickup} [ Fare: ${details.estimatedFare || 'N/A'} ]`,
    htmlContent: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a; max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 24px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        <!-- Header -->
        <div style="background-color: #FDB813; padding: 40px 20px; text-align: center;">
          <div style="display: inline-block; background-color: #0f172a; color: #FDB813; padding: 8px 16px; border-radius: 99px; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 12px;">
            Booking Request
          </div>
          <h1 style="margin: 0; font-size: 28px; font-weight: 900; color: #0f172a; letter-spacing: -0.5px;">New Web Booking</h1>
          <p style="margin: 8px 0 0 0; font-size: 14px; opacity: 0.8; font-weight: 500;">Trusty Yellow Cabs Alert</p>
        </div>

        <div style="padding: 32px;">
          <!-- Estimated Quote Section -->
          <div style="background-color: #fff9eb; border: 2px solid #FDB813; padding: 24px; border-radius: 20px; margin-bottom: 32px; text-align: center;">
            <p style="margin: 0 0 8px 0; font-size: 13px; color: #854d0e; text-transform: uppercase; font-weight: 800; letter-spacing: 1px;">Estimated Fare</p>
            <h2 style="margin: 0; font-size: 36px; font-weight: 900; color: #0f172a;">${details.estimatedFare || 'Pending Quote'}</h2>
            <div style="margin-top: 12px; display: inline-flex; align-items: center; gap: 6px; background-color: rgba(253, 184, 19, 0.2); padding: 4px 12px; border-radius: 99px;">
              <span style="font-size: 13px; font-weight: 700; color: #854d0e;"> Total Distance: ${details.distance || '---'}</span>
            </div>
          </div>

          <!-- Details Table -->
          <div style="background-color: #f8fafc; border-radius: 20px; padding: 8px; margin-bottom: 32px;">
            <table style="width: 100%; border-collapse: separate; border-spacing: 0;">
              <tr>
                <td style="padding: 16px; font-size: 14px; color: #64748b; font-weight: 600;"> Customer Phone</td>
                <td style="padding: 16px; font-size: 15px; font-weight: 800; text-align: right;">
                  <a href="tel:${details.phone}" style="color: #0f172a; text-decoration: none;">${details.phone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 16px; border-top: 1px solid #e2e8f0; font-size: 14px; color: #64748b; font-weight: 600;">Pickup Point</td>
                <td style="padding: 16px; border-top: 1px solid #e2e8f0; font-size: 14px; font-weight: 700; text-align: right;">
                  <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(details.pickup)}" target="_blank" style="color: #FDB813; text-decoration: underline;">
                    ${details.pickup}
                  </a>
                </td>
              </tr>
              <tr>
                <td style="padding: 16px; border-top: 1px solid #e2e8f0; font-size: 14px; color: #64748b; font-weight: 600;"> Drop Point</td>
                <td style="padding: 16px; border-top: 1px solid #e2e8f0; font-size: 14px; font-weight: 700; text-align: right;">
                  <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(details.drop)}" target="_blank" style="color: #FDB813; text-decoration: underline;">
                    ${details.drop}
                  </a>
                </td>
              </tr>
              <tr>
                <td style="padding: 16px; border-top: 1px solid #e2e8f0; font-size: 14px; color: #64748b; font-weight: 600;">Vehicle Choice</td>
                <td style="padding: 16px; border-top: 1px solid #e2e8f0; font-size: 15px; font-weight: 800; text-align: right; text-transform: uppercase;">${details.vehicleType}</td>
              </tr>
              <tr>
                <td style="padding: 16px; border-top: 1px solid #e2e8f0; font-size: 14px; color: #64748b; font-weight: 600;">Pickup Time (IST)</td>
                <td style="padding: 16px; border-top: 1px solid #e2e8f0; font-size: 15px; font-weight: 800; text-align: right;">${scheduleIST}</td>
              </tr>
            </table>
          </div>

          <!-- Action Buttons -->
          <div style="margin-top: 32px;">
            <p style="text-align: center; font-size: 14px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px;">Take Action Now</p>
            
            <a href="${waLink}" target="_blank" style="display: block; background-color: #25D366; color: white; padding: 18px; text-decoration: none; border-radius: 16px; font-weight: 800; text-align: center; margin-bottom: 12px; font-size: 16px; box-shadow: 0 4px 12px rgba(37, 211, 102, 0.2);">
              Reply on WhatsApp
            </a>
            
            <a href="${tgLink}" target="_blank" style="display: block; background-color: #0088cc; color: white; padding: 18px; text-decoration: none; border-radius: 16px; font-weight: 800; text-align: center; font-size: 16px; box-shadow: 0 4px 12px rgba(0, 136, 204, 0.2);">
              Reply on Telegram
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #f8fafc; padding: 24px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="margin: 0; font-size: 12px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
            © ${new Date().getFullYear()} Trusty Yellow Cabs
          </p>
          <p style="margin: 4px 0 0 0; font-size: 11px; color: #cbd5e1;">Sent via automated booking engine</p>
        </div>
      </div>
    `
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      keepalive: true,
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json'
      },
      body: JSON.stringify(emailContent)
    });

    return response.ok;
  } catch (error) {
    console.error("Network error during booking processing:", error);
    return false;
  }
};
