import { Link, Outlet } from 'react-router';

export function App() {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/user-registration">Регистрация пользователей</Link>
                </li>
                <li>
                    <Link to="wizard">Мини-форма в стиле wizard</Link>
                </li>
            </ul>
            <Outlet />
        </div>
    );
}
