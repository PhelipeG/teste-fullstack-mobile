import { z } from 'zod';

export const CreateMessageSchema = z.object({
  message: z.string().min(1, 'Mensagem é obrigatória e não pode estar vazia'),
});

export type CreateMessageDto = z.infer<typeof CreateMessageSchema>;
