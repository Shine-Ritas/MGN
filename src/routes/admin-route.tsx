import { lazy, Suspense } from "react";
import { AppRouteInterface } from "./type.ts";
import { adminStore } from "@/redux/stores/adminStore.ts";
import { Provider } from "react-redux";
import { adminRouteCollection } from "@/routes/data/admin_route.ts";
import { setting_routes } from "@/pages/admin/Settings/setting-route.tsx";
import { bot_routes } from "@/pages/admin/apps/bots/bot-route.tsx";
import { admin_routes } from "@/pages/admin/admins/admin-route.tsx";
import { PublishContentProvider } from "@/contexts/PublishContentContext.tsx";

const Dashboard = lazy(() => import('@/pages/admin/Dashboard.tsx'));
const Action = lazy(() => import('../pages/admin/Comics/Action.tsx'));
const Users = lazy(() => import('../pages/admin/Users/Users.tsx'));
const AddUser = lazy(() => import('../pages/admin/Users/AddUser.tsx'));
const CategoryIndex = lazy(() => import('../pages/admin/Category/CategoryIndex.tsx'));
const SubscriptionIndex = lazy(() => import('../pages/admin/Subscription/SubscriptionIndex.tsx'));
const SubscriptionCreateEdit = lazy(() => import('../pages/admin/Subscription/SubscriptionCreateEdit.tsx'));
const ComicIndex = lazy(() => import('../pages/admin/Comics/Index.tsx'));

const AdminLayout = lazy(() => import('@/layouts/AdminLayout.tsx'));
const NewChapter = lazy(() => import('@/pages/admin/CreateChapter/new-chapter.tsx'));
const EditChapter = lazy(() => import('@/pages/admin/CreateChapter/edit-chapter.tsx'));
const Reportpage = lazy(() => import('@/pages/admin/Report/report-index.tsx'));
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
    children: [
      setting_routes,
      ...admin_routes,
      ...bot_routes,
      {
        path: adminRouteCollection.dashboard,
        element: (
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: adminRouteCollection.mogous,
        element: (
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <PublishContentProvider>
              <ComicIndex />
            </PublishContentProvider>
          </Suspense>
        ),
      },
      {
        path: adminRouteCollection.mogouAction,
        element: (
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <Action />
          </Suspense>
        ),
      },
      {
        path: adminRouteCollection.mogouEdit,
        element: (
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <Action isEdit={true} />
          </Suspense>
        ),
      },
      {
        path: adminRouteCollection.chapterIndex,
        element: (
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <PublishContentProvider>
              <Chapters />
            </PublishContentProvider>
          </Suspense>
        ),
      },
      {
        path: adminRouteCollection.createChapter,
        element: (
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <NewChapter />
          </Suspense>
        )
      },
      {
        path: adminRouteCollection.editChapter,
        element: (
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <PublishContentProvider>
              <EditChapter />
            </PublishContentProvider>
          </Suspense>
        )
      },
      {
        path: adminRouteCollection.categories,
        element: (
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <CategoryIndex />
          </Suspense>
        ),
      },
      {
        path: adminRouteCollection.subscriptions,
        element: (
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <SubscriptionIndex />
          </Suspense>
        ),
      },
      {
        path: adminRouteCollection.addSubscription,
        element: (
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <SubscriptionCreateEdit />
          </Suspense>
        ),
      },
      {
        path: adminRouteCollection.editSubscription,
        element: (
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <SubscriptionCreateEdit isEdit={true} />
          </Suspense>
        ),
      },
      {
        path: adminRouteCollection.users,
        element: (
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <Users />
          </Suspense>
        ),
      },
      {
        path: adminRouteCollection.showUser,
        element: (
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <UserDetail />
          </Suspense>
        ),
      },
      {
        path: adminRouteCollection.addUser,
        element: (
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <AddUser />
          </Suspense>
        ),
      },

      {
        path: adminRouteCollection.reports,
        element: (
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <Reportpage />
          </Suspense>
        )
      }
    ]
  },

];

export default adminAuthenticatedRoutes;
