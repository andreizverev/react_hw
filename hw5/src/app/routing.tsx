import {createBrowserRouter} from 'react-router';
import {App} from '@/app/App';
import {NotFoundPage} from '@/pages/NotFound';
import {UseRefDemoPage} from "@/pages/UseRefDemoPage/index.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                index: true,
                element: <UseRefDemoPage/>,
            },
            {
                path: '*',
                element: <NotFoundPage/>,
            },
        ],
    },
]);
