import { z } from 'zod';

export const validationSchema = z
    .object({
        firstName: z.string().min(1, 'Имя обязательно'),
        lastName: z.string().min(1, 'Фамилия обязательна'),
        isMiddleNameRequired: z.boolean(),
        middleName: z.string().optional(),
        skills: z
            .array(z.object({ value: z.string().min(1, 'Навык не может быть пустым') }))
            .min(1, 'Добавьте хотя бы один навык'),
    })
    .superRefine((data, ctx) => {
        // Условная валидация: если isMiddleNameRequired === true, то middleName обязателен
        if (data.isMiddleNameRequired && !data.middleName?.trim()) {
            ctx.addIssue({
                path: ['middleName'],
                code: 'custom',
                message: 'Отчество обязательно',
            });
        }
    });
