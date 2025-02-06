import { prefixRoutes } from "@/utilities/util";
import { AppRouteCollectionInterface } from "./route";

const userRoutes = {
  home: "/",
  show: "/show/:slug",
  login: "/login",
  contact_us: "/contact_us",
  read: "/read",
  user_profile: "/user_profile",
};

const typedUserRoutes: AppRouteCollectionInterface<keyof typeof userRoutes> = userRoutes;

export const userRouteCollection = prefixRoutes("", typedUserRoutes);

