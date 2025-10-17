import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router';
import { App } from '@/app/App';
import { NotFoundPage } from '@/pages/NotFound/index';
import { ProfilePage } from '@/pages/Profile/index';
import { LoginPage } from '@/pages/Login/index';
import { ProtectedRoute } from '@/features/authRoating/ProtectedRoute';
import { PublicPage } from '@/pages/Public/index';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="public" element={<PublicPage />} />
            <Route element={<ProtectedRoute />}>
                <Route path="profile" element={<ProfilePage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Route>,
    ),
);
