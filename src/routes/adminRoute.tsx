import { lazy, Suspense } from "react";
import { AppRouteInterface } from "./type.ts";
import { adminStore } from "@/redux/stores/adminStore.ts";
import { Provider } from "react-redux";
import { adminRouteCollection } from "@/routes/data/admin_route.ts";
import { setting_routes } from "@/pages/admin/Settings/index.tsx";

const Dashboard = lazy(() => import('@/pages/admin/Dashboard.tsx'));
const Action = lazy(() => import('../pages/admin/Comics/Action.tsx'));
const Users = lazy(() => import('../pages/admin/Users/Users.tsx'));
const AddUser = lazy(() => import('../pages/admin/Users/AddUser.tsx'));
const CategoryIndex = lazy(() => import('../pages/admin/Category/CategoryIndex.tsx'));
const SubscriptionIndex = lazy(() => import('../pages/admin/Subscription/SubscriptionIndex.tsx'));
const SubscriptionCreateEdit = lazy(() => import('../pages/admin/Subscription/SubscriptionCreateEdit.tsx'));
const ComicIndex = lazy(() => import('../pages/admin/Comics/Index.tsx'));

const CreateBotComponent = lazy(() => import('@/pages/admin/apps/create.tsx'));
const Apps = lazy(() => import('@/pages/admin/apps/index.tsx'));
const AdminLayout = lazy(() => import('@/layouts/AdminLayout.tsx'));
const NewChapter = lazy(() => import('@/pages/admin/CreateChapter/NewChapter.tsx'));
const Reportpage = lazy(() => import('@/pages/admin/Report/reportIndex.tsx'));
const UserDetail = lazy(() => import('@/pages/admin/Users/UserDetail.tsx'));
const Chapters = lazy(() => import('@/pages/admin/Chapters/Chapters.tsx'));


const adminAuthenticatedRoutes: AppRouteInterface[] = [
  {
    element: 
    <Provider store={adminStore}>
      <Suspense fallback={<div></div>}>
        <AdminLayout />
      </Suspense>
    </Provider>
    ,
    children:[
        setting_routes,
        {
          path: adminRouteCollection.dashboard,
          element: <Dashboard />,
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
          path : adminRouteCollection.chapterIndex,
          element : <Chapters />
        },
        {
          path: adminRouteCollection.createChapter,
          element: <NewChapter />
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
          path: adminRouteCollection.showUser,
          element: <UserDetail />,
        },
        {
          path: adminRouteCollection.addUser,
          element: <AddUser />,
        },
        {
          path: adminRouteCollection.apps,
          element: <Apps />,
        },
        {
          path: adminRouteCollection.addBot,
          element : <CreateBotComponent />
        },

        {
          path: adminRouteCollection.reports,
          element: <Reportpage />
        }
    ]
  },
  
];

export default adminAuthenticatedRoutes;
