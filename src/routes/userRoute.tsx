import { lazy, Suspense } from "react";
import { AppRouteInterface } from "./type";
import { userStore } from "@/redux/stores/userStore";
import { Provider } from "react-redux";
import { userRouteCollection } from "./data/user_route";

const UserLayout = lazy(() => import('@/layouts/UserLayout.tsx'));
const HomePage = lazy(() => import('@/pages/users/home/Index.tsx'));
const Show = lazy(() => import('@/pages/users/Show/Show.tsx'));
const DetailPage = lazy(() => import('@/pages/users/Detail/detail.tsx'));

export const userAuthenticatedRoutes: AppRouteInterface[] = [
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
        path: userRouteCollection.detail,
        element: (
          <DetailPage />
        ),
      },
    ]
  },



];