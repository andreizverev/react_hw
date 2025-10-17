import { useAuth } from '@/features/authRoating/useAuth';
import { useEffect, useState } from 'react';
import { getMeInfo, type UserInfo } from '@/features/Profile/api';
import { useNavigate } from 'react-router';

export function Profile() {
    const securityContext = useAuth();
    const [userInfo, setUserInfo] = useState<UserInfo | null>();
    const navigate = useNavigate();
    useEffect(() => {
        if (securityContext.token) {
            getMeInfo(securityContext.token).then((r) => setUserInfo(r));
        }
    }, [securityContext.token]);
    const logoutAndRedirect = () => {
        securityContext.logout();
        navigate('/login', { replace: true });
    };
    return (
        <div>
            <div>User name: {userInfo?.name}</div>
            <div>
                <button onClick={logoutAndRedirect}>Logout</button>
            </div>
        </div>
    );
}
