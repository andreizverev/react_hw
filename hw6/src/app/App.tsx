import { Link, Outlet } from 'react-router';
import { useCallback, useState } from 'react';
import { ProtectedContext, type SecurityInfo } from '@/features/authRoating/useAuth';

const SECURITY_INFO_KEY = 'SECURITY_INFO_KEY';

function loadSecurityInfo(): SecurityInfo {
    const securityInfoAsString = localStorage.getItem(SECURITY_INFO_KEY);
    if (securityInfoAsString) {
        return JSON.parse(securityInfoAsString);
    } else {
        return {
            token: null,
        };
    }
}

export function App() {
    const [securityContext, setSecurityContext] = useState<SecurityInfo>(loadSecurityInfo());
    const login = useCallback((securityInfo: SecurityInfo) => {
        localStorage.setItem(SECURITY_INFO_KEY, JSON.stringify(securityInfo));
        setSecurityContext(securityInfo);
    }, []);
    const logout = useCallback(() => {
        const nullContext = { token: null };
        localStorage.setItem(SECURITY_INFO_KEY, JSON.stringify(nullContext));
        setSecurityContext(nullContext);
    }, []);
    return (
        <>
            <ProtectedContext value={{ ...securityContext, login, logout }}>
                <nav>
                    <ul>
                        {!securityContext.token && (
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                        )}
                        {securityContext.token && (
                            <>
                                <li>
                                    <Link to="/profile">Profile</Link>
                                </li>
                            </>
                        )}
                    </ul>
                    <Outlet />
                </nav>
            </ProtectedContext>
        </>
    );
}
