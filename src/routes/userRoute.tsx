import { lazy, Suspense } from "react";
import { AppRouteInterface } from "./type";
import { userStore } from "@/redux/stores/userStore";
import { Provider } from "react-redux";
import { userRouteCollection } from "./data/user_route";

const UserLayout = lazy(() => import('@/layouts/UserLayout.tsx'));
const UserProfile = lazy(() => import('@/pages/users/Profile/UserProfile.tsx'));


export const userAuthenticatedRoutes: AppRouteInterface[] = [
  {
    path: undefined,
    element: (
      <Provider store={userStore}>
        <Suspense fallback={<div></div>}>
          <UserLayout />
        </Suspense>
      </Provider>
    ),
    children: [
      {
          path: userRouteCollection.user_profile,
          element: (
            <UserProfile />
          )
      }
    ]
  },
];