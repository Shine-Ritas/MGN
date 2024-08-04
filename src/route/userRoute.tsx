import { lazy } from "react";
import { AppRouteInterface } from "./type";
import { userRouteCollection } from "@/constants/constants";
import Show from "@/pages/users/Show/Show";
import { UserLogin } from "@/pages/users/Auth/Login";


const UserLayout = lazy(() => import('@/layouts/UserLayout.tsx'));
const HomePage = lazy(() => import('@/pages/users/home/Index.tsx'));


export const userAuthenticatedRoutes: AppRouteInterface[] = [
  {
    path: userRouteCollection.home,
    element: (
      <UserLayout >
        <HomePage />
      </UserLayout>
    ),
  },
  {
    path: userRouteCollection.show,
    element: (
      <UserLayout >
        <Show />
      </UserLayout>
    ),
  },
  {
    path : userRouteCollection.login,
    element: (
      <UserLogin />
    )
  }

];