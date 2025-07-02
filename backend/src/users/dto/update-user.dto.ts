import { z } from 'zod';

export const UpdateUserSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
});

export type UpdateUserDTO = z.infer<typeof UpdateUserSchema>;
