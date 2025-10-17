import { api } from '@/shared/api/base';

export type UserInfo = {
    name: string;
};

export const getMeInfo = (token: string) =>
    api
        .get<UserInfo>('users/me', {
            headers: {
                Authorization: token,
            },
        })
        .json();
