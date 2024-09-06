import { lazy } from 'react';
import { AppRouteInterface } from './type';
import { adminStore } from '@/redux/stores/adminStore';
import { Provider } from 'react-redux';

const Login = lazy(() => import('@/pages/admin/Login/Login.tsx'));

const guestRoutes : AppRouteInterface[] = [
    {
        path : '/admin/login',
        element : (
            <Provider store={adminStore}>
                <Login />
            </Provider>
        )
    }
];

export default guestRoutes