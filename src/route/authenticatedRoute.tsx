import { lazy } from "react";
import { AppRouteInterface } from "./type";
import { adminRouteCollection } from "@/constants/constants.ts";
import Apps from "@/pages/admin/apps/index.tsx";


const AdminLayout = lazy(() => import('@/layouts/AdminLayout.tsx'));
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
    path: adminRouteCollection.dashboard,
    element: (
      <AdminLayout title="Dashboard">
        <Dashboard />
      </AdminLayout>
    ),
  },
  {
    path: adminRouteCollection.setting,
    element: (
      <AdminLayout title="Setting">
        <Setting />
      </AdminLayout>
    ),
    children: [
      {
        path: adminRouteCollection.generalSetting,
        element: (
          <GeneralSetting />
        ),
        index : true,
      },
      {
        path: adminRouteCollection.generalBanner,
        element: (
          <BannerSetting />
        ),
      }
    ]
  },
  {
    path: adminRouteCollection.comics,
    element: (
      <AdminLayout title="Comics">
        <ComicIndex />
      </AdminLayout>
    ),
  },
  {
    path: adminRouteCollection.comicsActions,
    element: (
      <AdminLayout title="Comics">
        <Action />
      </AdminLayout>
    ),
  },
  {
    path: adminRouteCollection.categories,
    element: (
      <AdminLayout title="Categories">
        <CategoryIndex />
      </AdminLayout>
    ),
  },
  {
    path: adminRouteCollection.subscriptions,
    element: (
      <AdminLayout title="Subscriptions">
        <SubscriptionIndex />
      </AdminLayout>
    ),
  },
  {
    path: adminRouteCollection.addSubscription,
    element: (
      <AdminLayout title="New Subscription">
        <SubscriptionCreateEdit />
      </AdminLayout>
    ),
  },
  {
    path: adminRouteCollection.editSubscription,
    element: (
      <AdminLayout title="Editing Subscription">
        <SubscriptionCreateEdit isEdit={true} />
      </AdminLayout>
    ),
  },
  {
    path: adminRouteCollection.users,
    element: (
      <AdminLayout title="Subscribed Users">
        <Users />
      </AdminLayout>
    ),
  },
  {
    path: adminRouteCollection.addUser,
    element: (
      <AdminLayout title="Register New User">
        <AddUser />
      </AdminLayout>
    ),
  },
  {
    path: adminRouteCollection.apps,
    element: (
      <AdminLayout title="Apps">
        <Apps />
      </AdminLayout>
    ),
  }
];

export default adminAuthenticatedRoutes;
