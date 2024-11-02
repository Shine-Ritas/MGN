import { prefixRoutes } from "../helper";
import { AppRouteCollectionInterface } from "./route";


const userRoutes: AppRouteCollectionInterface = {
    home: "/",
    show: "/show/:slug",
    login: "/login",
    contact_us: "/contact_us",
    detail: "/read"
  }

export const userRouteCollection = prefixRoutes('', userRoutes);
