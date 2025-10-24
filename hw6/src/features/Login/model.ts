import { z } from 'zod';

export const schema = z.object({
    email: z.email().trim().min(1),
    password: z.string().trim().min(1),
});
export type LoginData = z.infer<typeof schema>;
