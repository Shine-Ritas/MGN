import { lazy, Suspense } from 'react';
import { AppRouteInterface } from './type';
import { adminStore } from '@/redux/stores/adminStore';
import { Provider } from 'react-redux';
import { userStore } from '@/redux/stores/userStore';
import { userRouteCollection } from './data/user_route';

// Lazy load all components for better code splitting
const UserGuestLayout = lazy(() => import("@/pages/users/Auth/UserGuestLayout"));
const UserRegister = lazy(() => import('@/pages/users/Auth/Register'));
const UserLogin = lazy(() => import('@/pages/users/Auth/Login.tsx'));
const ContactUs = lazy(() => import('@/pages/users/Auth/ContactUs.tsx'));
const Login = lazy(() => import('@/pages/admin/Login/Login.tsx'));
const HomePage = lazy(() => import('@/pages/users/home/Index.tsx'));
const Show = lazy(() => import('@/pages/users/Show/Show.tsx'));
const DetailPage = lazy(() => import('@/pages/users/Detail/detail.tsx'));
const UserLayout = lazy(() => import('@/layouts/UserLayout.tsx'));
const FilterPage = lazy(()=>import("@/pages/users/Filter/index.tsx"))

const adminGuestRoutes: AppRouteInterface[] = [
    {
        path: "admin/login",
        element: (
            <Provider store={adminStore}>
                <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
                    <Login />
                </Suspense>
            </Provider>
        )
    },

];

const userGuestRoutes: AppRouteInterface[] = [
    {
        path: undefined,
        element: (
            <Provider store={userStore}>
                <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
                    <UserGuestLayout />
                </Suspense>
            </Provider>
        ),
        children: [
            {
                path: userRouteCollection.login,
                element: (
                    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
                        <UserLogin />
                    </Suspense>
                )
            },
            {
                path: userRouteCollection.register,
                element: (
                    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
                        <UserRegister />
                    </Suspense>
                )
            },

            {
                path: userRouteCollection.contact_us,
                element: (
                    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
                        <ContactUs />
                    </Suspense>
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
                    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
                        <HomePage />
                    </Suspense>
                ),
            },
            {
                path: userRouteCollection.show,
                element: (
                    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
                        <Show />
                    </Suspense>
                ),
            },
            {
                path: userRouteCollection.read,
                element: (
                    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
                        <DetailPage />
                    </Suspense>
                ),
            },
            {
                path : userRouteCollection.filter_type,
                element: (
                    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
                        <FilterPage />
                    </Suspense>
                )
            }

        ]
    }
];

export default userGuestRoutes;
export { adminGuestRoutes };