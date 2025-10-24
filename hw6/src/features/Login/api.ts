import { api } from '@/shared/api/base';
import type { LoginData } from '@/features/Login/model';

export type LoginResponse = {
    accessToken: string;
};

export const login = (data: LoginData) =>
    api
        .post<LoginResponse>('auth/login', {
            json: {
                email: data.email,
                password: data.password,
            },
            retry: 0,
        })
        .json();
