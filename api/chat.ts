import { GoogleGenAI } from '@google/genai';
import { FLEET_DATA, SERVICES_DATA } from '../constants';

const SYSTEM_INSTRUCTION = `You are 'TrustyYellowCabs Assistant', the helpful AI assistant for TrustyYellowCabs.
Fleet information: ${JSON.stringify(FLEET_DATA.map((vehicle) => `${vehicle.name} (${vehicle.type}): ₹${vehicle.pricePerHour}/hr, Seats: ${vehicle.capacity}`))}
Services: ${JSON.stringify(SERVICES_DATA.map((service) => `${service.title}: ${service.description}`))}
Help users choose a vehicle, explain services, or guide them to the booking form. Keep responses concise (under 50 words unless detailed info is requested). Be polite, professional, and friendly. Do not process payments in chat.`;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const message = req.body?.message;
  if (typeof message !== 'string' || message.trim().length === 0 || message.length > 2_000) {
    res.status(400).json({ error: 'Message is invalid' });
    return;
  }

  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(503).json({ error: 'Chat service unavailable' });
    return;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message.trim(),
      config: { systemInstruction: SYSTEM_INSTRUCTION },
    });
    res.status(200).json({ reply: response.text || "I didn't quite catch that." });
  } catch {
    res.status(502).json({ error: 'Chat service unavailable' });
  }
}
