import { useAuth } from '@/features/authRoating/useAuth';
import { Navigate, Outlet, useLocation } from 'react-router';

export function ProtectedRoute() {
    const securityContext = useAuth();
    const location = useLocation();
    if ('token' in securityContext && !securityContext.token) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }
    return <Outlet />;
}
