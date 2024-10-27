import { lazy } from 'react';
import { AppRouteInterface } from './type';
import { adminStore } from '@/redux/stores/adminStore';
import { Provider } from 'react-redux';
import UserGuestLayout from "@/pages/users/Auth/UserGuestLayout";
import { userStore } from '@/redux/stores/userStore';
import { userRouteCollection } from './data/user_route';
const UserLogin = lazy(() => import('@/pages/users/Auth/Login.tsx'));
const ContactUs = lazy(() => import('@/pages/users/Auth/ContactUs.tsx'));

const Login = lazy(() => import('@/pages/admin/Login/Login.tsx'));

const adminGuestRoutes: AppRouteInterface[] = [
    {
        path: "admin/login",
        element: (
            <Provider store={adminStore}>
                <Login />
            </Provider>
        )
    },

];

const userGuestRoutes: AppRouteInterface[] = [
    {
        path: userRouteCollection.base,
        element: (
            <Provider store={userStore}>
                <UserGuestLayout />
            </Provider>
        ),
        children: [
            {
                path: userRouteCollection.login,
                element: (
                    <UserLogin />
                )
            },
            {
                path: userRouteCollection.contact_us,
                element: (
                    <ContactUs />
                )
            }

        ]
    },
];

export default userGuestRoutes;
export { adminGuestRoutes };