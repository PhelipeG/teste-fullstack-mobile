import { useMutation } from '@tanstack/react-query';
import { sendMessage } from '../services/chatbotService';

export function useChatbot() {
  return useMutation({
    mutationFn: sendMessage,
  });
}
