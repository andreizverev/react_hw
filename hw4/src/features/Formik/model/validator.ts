import * as yup from 'yup';
import type { FormValues } from './types';

export const validationSchema: yup.ObjectSchema<FormValues> = yup.object({
    firstName: yup.string().trim().required('Имя обязательно'),
    lastName: yup.string().trim().required('Фамилия обязательна'),
    isMiddleNameRequired: yup.boolean().required(),
    middleName: yup
        .string()
        .trim()
        .when('isMiddleNameRequired', {
            is: true,
            then: (schema) => schema.required('Отчество обязательно'),
            otherwise: (schema) => schema.optional().nullable(),
        }),
    skills: yup
        .array()
        .of(yup.string().trim().required('Навык должен быть указан'))
        .min(1, 'Добавьте хотя бы один навык')
        .required(),
});
