import { z } from 'zod';

export const PasswordSchema = z.object({
  url: z.string().url(),
  key: z.string(),
  password: z.string(),
});
