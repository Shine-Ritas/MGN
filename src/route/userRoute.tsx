import { lazy } from "react";
import { AppRouteInterface } from "./type";
import { userRouteCollection } from "@/constants/constants";
import { userStore } from "@/redux/stores/userStore";
import { Provider } from "react-redux";

const UserLayout = lazy(() => import('@/layouts/UserLayout.tsx'));
const HomePage = lazy(() => import('@/pages/users/home/Index.tsx'));
const UserLogin = lazy(() => import('@/pages/users/Auth/Login.tsx'));
const Show = lazy(() => import('@/pages/users/Show/Show.tsx'));


export const userAuthenticatedRoutes: AppRouteInterface[] = [
  {
    path: userRouteCollection.home,
    element: (
      <Provider store={userStore}>
        <UserLayout />
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
        path: userRouteCollection.login,
        element: (
          <UserLogin />
        )
      }
    ]
  },

];