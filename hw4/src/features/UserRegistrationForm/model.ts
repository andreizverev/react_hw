import { z } from 'zod';

export const model = z
    .object({
        username: z.string().trim().min(1, { error: 'Обязательное поле' }),
        email: z.string().trim().min(1, { error: 'Обязательное поле' }).includes('@', { error: 'Должно содержать @' }),
        password: z.string().trim().min(6, { error: 'Длина >= 6' }),
        confirmedPassword: z.string().trim().min(6, { error: 'Длина >= 6' }),
        links: z.array(z.object({ value: z.httpUrl('Некорректный URL') })),
    })
    .refine((d) => d.password === d.confirmedPassword, {
        message: 'Пароли не совпадают',
        path: ['confirmedPassword'],
    });
