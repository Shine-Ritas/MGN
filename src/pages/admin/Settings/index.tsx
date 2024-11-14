import { lazy } from "react";
import { adminRouteCollection } from "@/routes/data/admin_route.ts";
import { AppRouteInterface } from "@/routes/type";

const SectionManagement = lazy(() => import('@/pages/admin/Settings/SectionManagement.tsx'));
const GeneralUserAvatars = lazy(() => import('@/pages/admin/Settings/UserAvatar/user-avatar'));
const BannerSetting = lazy(() => import('@/pages/admin/Settings/banner-setting'));
const GeneralSetting = lazy(() => import('@/pages/admin/Settings/general-setting'));
const Setting = lazy(() => import('@/pages/admin/Setting.tsx'));

export const setting_routes : AppRouteInterface = {
    path: adminRouteCollection.setting,
    element: <Setting />,
    children: [
      {
        path: adminRouteCollection.generalSetting,
        element: <GeneralSetting />,
        index: true,
        label: 'General'
      },
      {
        path: adminRouteCollection.sectionManagement,
        element: <SectionManagement />,
        label: 'Sections'
      },
      {
        path: adminRouteCollection.generalBanner,
        element: <BannerSetting />,
        label: 'Banners'
      },
      {
        path: adminRouteCollection.generalUserAvatars,
        element: <GeneralUserAvatars />,
        label: 'User Avatars'
      }
    ]
  }