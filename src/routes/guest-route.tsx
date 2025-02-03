import { lazy, Suspense } from 'react';
import { AppRouteInterface } from './type';
import { adminStore } from '@/redux/stores/adminStore';
import { Provider } from 'react-redux';
import UserGuestLayout from "@/pages/users/Auth/UserGuestLayout";
import { userStore } from '@/redux/stores/userStore';
import { userRouteCollection } from './data/user_route';
const UserLogin = lazy(() => import('@/pages/users/Auth/Login.tsx'));
const ContactUs = lazy(() => import('@/pages/users/Auth/ContactUs.tsx'));
const Login = lazy(() => import('@/pages/admin/Login/Login.tsx'));
const HomePage = lazy(() => import('@/pages/users/home/Index.tsx'));
const Show = lazy(() => import('@/pages/users/Show/Show.tsx'));
const DetailPage = lazy(() => import('@/pages/users/Detail/detail.tsx'));
const UserLayout = lazy(() => import('@/layouts/UserLayout.tsx'));

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
        path: undefined,
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
            },
        ]
    },
    {
        path: userRouteCollection.home,
        element: (
            <Provider store={userStore}>
                <Suspense fallback={<div></div>}>
                    <UserLayout />
                </Suspense>
            </Provider>
        ),
        children: [
            {
                path: userRouteCollection.home,
                element: (
                    <HomePage />
                ),
            },
            {
                path: userRouteCollection.show,
                element: (
                    <Show />
                ),
            },
            {
                path: userRouteCollection.read,
                element: (
                    <DetailPage />
                ),
            },

        ]
    }
];

export default userGuestRoutes;
export { adminGuestRoutes };