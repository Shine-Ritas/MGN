import { useRoutes } from "react-router-dom"

import { ThemeProvider } from "@/components/theme-provider"
import useAuth from "@/hooks/useAuth.tsx";

import adminAuthenticatedRoutes from "./admin-route.tsx";
import NotFoundError from "@/pages/errors/not-found.tsx";
import { Toaster } from "@/components/ui/toaster.tsx";
import userGuestRoutes, { adminGuestRoutes } from "./guest-route.tsx";
import { userAuthenticatedRoutes } from "./user-route.tsx";


/* The `const AppRoute` function is defining the routing logic for the application using React Router.
It first checks if the admin and user are authenticated using the `useAuth` hook. Based on the
authentication status, it determines which routes to render for admin and user. It also includes
common routes for handling 404 errors. */
const AppRoute = () => {

  const adminIsAuthenticated = useAuth({ adminGuard: true });
  const userIsAuthenticated = useAuth({adminGuard: false});

  const commonRoutes = [
    {
      path: "*",
      element: adminIsAuthenticated ? <NotFoundError /> : <NotFoundError />
    }];

  const adminRoutes = adminIsAuthenticated ? adminAuthenticatedRoutes : adminGuestRoutes;
  const userRoutes = userIsAuthenticated ? userAuthenticatedRoutes : [];

  const routes = [...adminRoutes, ...userRoutes, ...commonRoutes,...userGuestRoutes];

  const routeCollection = useRoutes([...routes]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

      {/* <Routes>
               <Route path="admin/*" element={<AdminLayout />} />
            </Routes> */}
      {routeCollection}

      <Toaster />
    </ThemeProvider>
  )
}

export default AppRoute