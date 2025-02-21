import { lazy } from "react";
import { adminRouteCollection } from "@/routes/data/admin_route.ts";
import { AppRouteInterface } from "@/routes/type";

const AdminsTable = lazy(() => import('@/pages/admin/admins/index.tsx'));

export const admin_routes: AppRouteInterface[] =
[
        {
            path: adminRouteCollection.admins,
            element: <AdminsTable />,
            label: 'Admins'
        },
]


