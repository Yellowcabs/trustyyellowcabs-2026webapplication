
import { BookingDetails } from '../types';

export const sendBookingEmail = async (details: BookingDetails): Promise<boolean> => {
  // Guidelines: The API key must be obtained exclusively from process.env.API_KEY
   const apiKey = import.meta.env.VITE_BREVO_API_KEY;
  
  if (!apiKey) {
    console.error("API configuration is missing. Please ensure the environment is correctly set up.");
    return false;
  }

  const url = "https://api.brevo.com/v3/smtp/email";

  
  // Primary notification for the business admin
  const recipients = [
    { email: "trustyyellowcabs@gmail.com", name: "Trustyyellowcabs Admin" }
  ];

  const emailContent = {
    sender: { name: "Trustyyellowcabs Booking", email: "trustyyellowcabs@gmail.com" },
    to: recipients,
    subject: `Booking Request: ${details.pickup} [ Fare: ${details.estimatedFare || 'N/A'} ]`,
    htmlContent: `
      <div style="font-family: sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #f1f5f9; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #FDB813; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px; color: #0f172a;">New Web Booking</h1>
        </div>
        <div style="padding: 30px;">
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
            <p style="margin: 0 0 10px 0; font-size: 14px; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Estimated Quote</p>
            <h2 style="margin: 0; font-size: 32px; color: #0f172a;">${details.estimatedFare || 'Calculated on call'}</h2>
            <p style="margin: 5px 0 0 0; font-size: 14px; color: #0f172a;">Total distance: <strong>${details.distance || 'Unknown'}</strong></p>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;">Customer</td><td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;">${details.name}</td></tr>
            <tr><td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;">Phone</td><td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;"><a href="tel:${details.phone}">${details.phone}</a></td></tr>
            <tr><td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;">Pickup</td><td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;">${details.pickup}</td></tr>
            <tr><td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;">Destination</td><td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;">${details.drop}</td></tr>
            <tr><td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;">Vehicle Type</td><td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;">${details.vehicleType}</td></tr>
            <tr><td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;">Schedule</td><td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;">${details.date} at ${details.time}</td></tr>
          </table>
          <div style="margin-top: 30px; text-align: center;">
            <a href="https://wa.me/${details.phone.replace(/\D/g, '')}" style="background-color: #25D366; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Reply on WhatsApp</a>
          </div>
        </div>
        <div style="background-color: #f1f5f9; padding: 15px; text-align: center; font-size: 12px; color: #94a3b8;">
          Sent from Trustyyellowcabs Booking System
        </div>
      </div>
    `
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
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
