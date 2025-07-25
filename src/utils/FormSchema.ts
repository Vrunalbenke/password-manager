import { z } from 'zod';

export const PasswordSchema = z.object({
  brand: z.string(),
  url: z.string().url(),
  key: z.string(),
  password: z.string(),
  note: z.string().optional(),
  tags: z.array(z.string().optional()),
  tag: z.string().optional(),
});
