import { lazy } from "react";
import { AppRouteInterface } from "./type.ts";
import { adminRouteCollection } from "@/constants/constants.ts";
import Apps from "@/pages/admin/apps/index.tsx";
import AdminLayout from "@/layouts/AdminLayout.tsx";

const Dashboard = lazy(() => import('@/pages/admin/Dashboard.tsx'));
const Setting = lazy(() => import('../pages/admin/Setting.tsx'));
const Action = lazy(() => import('../pages/admin/Comics/Action.tsx'));
const Users = lazy(() => import('../pages/admin/Users/Users.tsx'));
const AddUser = lazy(() => import('../pages/admin/Users/AddUser.tsx'));
const CategoryIndex = lazy(() => import('../pages/admin/Category/CategoryIndex.tsx'));
const SubscriptionIndex = lazy(() => import('../pages/admin/Subscription/SubscriptionIndex.tsx'));
const SubscriptionCreateEdit = lazy(() => import('../pages/admin/Subscription/SubscriptionCreateEdit.tsx'));
const ComicIndex = lazy(() => import('../pages/admin/Comics/Index.tsx'));
const BannerSetting = lazy(() => import('../pages/admin/Settings/BannerSetting.tsx'));
const GeneralSetting = lazy(() => import('../pages/admin/Settings/GeneralSetting.tsx'));



const adminAuthenticatedRoutes: AppRouteInterface[] = [
  {
    element: <AdminLayout />,
    children:[
        {
          path: adminRouteCollection.dashboard,
          element: <Dashboard />,
        },
        {
          path: adminRouteCollection.setting,
          element: <Setting />,
          children: [
            {
              path: adminRouteCollection.generalSetting,
              element: <GeneralSetting />,
              index: true,
            },
            {
              path: adminRouteCollection.generalBanner,
              element: <BannerSetting />,
            }
          ]
        },
        {
          path: adminRouteCollection.mogous,
          element: <ComicIndex />,
        },
        {
          path: adminRouteCollection.mogouAction,
          element: <Action />,
        },
        {
          path: adminRouteCollection.mogouEdit,
          element: <Action isEdit={true}/>,
        },
        {
          path: adminRouteCollection.categories,
          element: <CategoryIndex />,
        },
        {
          path: adminRouteCollection.subscriptions,
          element: <SubscriptionIndex />,
        },
        {
          path: adminRouteCollection.addSubscription,
          element: <SubscriptionCreateEdit />,
        },
        {
          path: adminRouteCollection.editSubscription,
          element: <SubscriptionCreateEdit isEdit={true} />,
        },
        {
          path: adminRouteCollection.users,
          element: <Users />,
        },
        {
          path: adminRouteCollection.addUser,
          element: <AddUser />,
        },
        {
          path: adminRouteCollection.apps,
          element: <Apps />,
        }
    ]
  },
  
];

export default adminAuthenticatedRoutes;
