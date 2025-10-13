import { createBrowserRouter } from 'react-router';
import { App } from '@/app/App';
import { NotFoundPage } from '@/pages/NotFound';
import { UserRegistrationPage } from '@/pages/UserRegistrationPage/index';
import { WizardPage } from '@/pages/WizardPage/index';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/user-registration',
                element: <UserRegistrationPage />,
            },
            {
                path: '/wizard',
                element: <WizardPage />,
            },
            {
                path: '*',
                element: <NotFoundPage />,
            },
        ],
    },
]);
