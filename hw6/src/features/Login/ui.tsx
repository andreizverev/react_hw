import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/features/authRoating/useAuth';
import { useLocation, useNavigate } from 'react-router';
import { type LoginData, schema } from '@/features/Login/model';
import { login } from '@/features/Login/api';

export function LoginForm() {
    const form = useForm<LoginData>({ resolver: zodResolver(schema) });
    const securityContext = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const handleSubmit = async (data: LoginData) => {
        await login(data).then((r) => securityContext.login({ token: r.accessToken }));
        navigate(location.state?.from ?? '/profile');
    };
    return (
        <div>
            {securityContext.token && <div>Вы успешно авторизованы!</div>}
            {!securityContext.token && (
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <div>
                            <label>
                                <span>email: </span>
                                <input {...form.register('email')} defaultValue="admin@gmail.com" />
                            </label>
                        </div>
                        <div>
                            <label>
                                <span>Password: </span>
                                <input type="password" {...form.register('password')} defaultValue="administrator" />
                            </label>
                        </div>
                        <button type="submit">Отправить</button>
                    </form>
                </FormProvider>
            )}
        </div>
    );
}
