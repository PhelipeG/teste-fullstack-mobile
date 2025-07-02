import { api } from './api';

export async function sendMessage(message: string): Promise<string> {
  const response = await api.post('/chatbot', { message });
  return response.data.reply;
}
