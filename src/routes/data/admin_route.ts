
import { prefixRoutes } from "@/utilities/util";
import { AppRouteCollectionInterface } from "./route";



const adminRoutes: AppRouteCollectionInterface = {
  dashboard: "/dashboard",

  mogous: "/mogous",
  mogouAction: "/mogou/actions",
  mogouEdit: "/mogou/edit/:slug",
  chapterIndex: "/mogou/:slug/chapters",

  createChapter: "/mogou/:slug/chapters/create",
  editChapter: "/mogou/:slug/chapters/edit/:id",

  categories: "/categories",

  subscriptions: "/subscriptions",
  addSubscription: "/subscriptions/add",
  editSubscription: "/subscriptions/edit/:id",

  reports: "/reports",

  users: "/users",
  showUser: "/users/:id",
  addUser: "/add/user",

  apps: "/apps",
  addBot: '/apps/add-bot',
  showBot: '/apps/show-bot/:id',
  botList: '/apps/:app/bots/list',

  setting: "/setting",
  sectionManagement: "/setting/sectionManagment",
  generalSetting: "/setting/general",
  generalBanner: "/setting/banner",
  generalUserAvatars: "/setting/user-avatars",
  generalPrefixUpload: "/setting/prefix-upload",

};

export const adminRouteCollection = prefixRoutes('/admin', adminRoutes);

