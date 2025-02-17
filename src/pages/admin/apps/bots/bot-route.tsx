import { lazy } from "react";
import { adminRouteCollection } from "@/routes/data/admin_route.ts";
import { AppRouteInterface } from "@/routes/type";

const Apps = lazy(() => import('@/pages/admin/apps/index.tsx'));

const BotList = lazy(() => import('@/pages/admin/apps/bots/bot-list'));
const CreateBot = lazy(() => import('@/pages/admin/apps/bots/create-bot'));
const BotDetail = lazy(() => import('@/pages/admin/apps/bots/bot-detail'));


export const bot_routes: AppRouteInterface[] =
[
        {
            path: adminRouteCollection.apps,
            element: <Apps />,
            label: 'Apps'
        },
        {
            path: adminRouteCollection.botList,
            element: <BotList />,
            label: 'General'
        },
        {
            path: adminRouteCollection.addBot,
            element: <CreateBot />,
        },
        {
            path: adminRouteCollection.showBot,
            element: <BotDetail />
        }
]


