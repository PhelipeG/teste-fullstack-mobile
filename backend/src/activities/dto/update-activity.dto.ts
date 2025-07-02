import { z } from 'zod';
import { CreateActivitySchema } from './create-activity.dto';

export const UpdateActivitySchema = CreateActivitySchema.partial();

export type UpdateActivityDTO = z.infer<typeof UpdateActivitySchema>;
