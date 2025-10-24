import { createContext, useContext } from 'react';

export type SecurityInfo = {
    token: string | null;
};

export type SecurityMethods = {
    login: (securityInfo: SecurityInfo) => void;
    logout: () => void;
};

export type SecurityContext = SecurityInfo & SecurityMethods;

export const ProtectedContext = createContext<SecurityContext>({
    token: null,
    login: () => {},
    logout: () => {},
});

export function useAuth(): SecurityContext {
    return useContext(ProtectedContext);
}
