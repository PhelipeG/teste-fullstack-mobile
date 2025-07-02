import { z } from 'zod';

export const CreateActivitySchema = z.object({
  name: z.string().min(3, 'Nome da atividade deve ter pelo menos 3 caracteres'),
  duration: z.number().min(1, 'Duração deve ser pelo menos 1 minuto'), // em minutos
  intensity: z.enum(['low', 'medium', 'high']),
});

export type CreateActivityDTO = z.infer<typeof CreateActivitySchema>;
