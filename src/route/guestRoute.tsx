import { lazy } from 'react';
import { AppRouteInterface } from './type';

const Login = lazy(() => import('@/pages/admin/Login/Login.tsx'));

const guestRoutes : AppRouteInterface[] = [
    {
        path : '/admin/login',
        element : (
            <Login />
        )
    }
];

export default guestRoutes