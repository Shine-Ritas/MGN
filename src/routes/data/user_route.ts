import { prefixRoutes } from "@/utilities/util";
import { AppRouteCollectionInterface } from "./route";


const userRoutes: AppRouteCollectionInterface = {
    home: "/",
    show: "/show/:slug",
    login: "/login",
    contact_us: "/contact_us",
    detail: "/read",
    user_profile : "/user_profile",
  }

export const userRouteCollection = prefixRoutes('', userRoutes);
