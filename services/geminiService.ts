export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    if (!response.ok) return "I'm sorry, I cannot connect to the server right now. Please try again later.";
    const payload = await response.json() as { reply?: string };
    return payload.reply || "I didn't quite catch that.";
  } catch {
    return "Sorry, I'm having trouble processing your request.";
  }
};
