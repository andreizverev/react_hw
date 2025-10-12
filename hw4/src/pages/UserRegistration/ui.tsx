import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

const schema = z
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

type FormData = z.infer<typeof schema>;

export function UserRegistration() {
    const form = useForm<FormData>({ resolver: zodResolver(schema) });
    const {
        control,
        formState: { errors },
    } = form;
    const { fields: links, append: appendLinks, remove: removeLink } = useFieldArray({ control, name: 'links' });

    const [submitted, setSubmitted] = useState<FormData | null>(null);
    const onSubmit = (data: FormData) => {
        setSubmitted(data);
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div>
                    <label>Имя пользователя</label>
                    <input {...form.register('username')} />
                    {errors.username && <span>{errors.username?.message}</span>}
                </div>
                <div>
                    <label>Email</label>
                    <input {...form.register('email')} />
                    {errors.email && <span>{errors.email?.message}</span>}
                </div>
                <div>
                    <label>Пароль</label>
                    <input type="password" {...form.register('password')} />
                    {errors.password && <span>{errors.password?.message}</span>}
                </div>
                <div>
                    <label>Подтверждение пароля</label>
                    <input type="password" {...form.register('confirmedPassword')} />
                    {errors.confirmedPassword && <span>{errors.confirmedPassword?.message}</span>}
                </div>
                <div>
                    <p>Социальные сети:</p>
                    <ul>
                        {links.map((l, i) => (
                            <li key={l.id}>
                                <input {...form.register(`links.${i}.value`)} />
                                <button onClick={() => removeLink(i)}>Удалить</button>
                                {errors.links?.[i]?.value && <span>{errors.links[i].value?.message}</span>}
                            </li>
                        ))}
                    </ul>
                    <button onClick={() => appendLinks({ value: '' })}>Добавить</button>
                </div>
                <hr />
                <button type="submit">Отправить</button>
            </form>
            <hr />
            <div>
                <p>Отправлено:</p>
                <span>{JSON.stringify(submitted, null, 2)}</span>
            </div>
        </FormProvider>
    );
}
