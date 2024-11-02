import { useRoutes } from "react-router-dom"

import { ThemeProvider } from "@/components/theme-provider"
import useAuth from "@/hooks/useAuth.tsx";

import adminAuthenticatedRoutes from "./adminRoute.tsx";
import NotFoundError from "@/pages/errors/not-found.tsx";
import { userAuthenticatedRoutes } from "./userRoute.tsx";
import { Toaster } from "@/components/ui/toaster.tsx";
import userGuestRoutes, { adminGuestRoutes } from "./guestRoute.tsx";


const AppRoute = () => {

  const adminIsAuthenticated = useAuth({ adminGuard: true });
  const userIsAuthenticated = useAuth({adminGuard: false});

  const commonRoutes = [
    {
      path: "*",
      element: adminIsAuthenticated ? <NotFoundError /> : <NotFoundError />
    }];

  const adminRoutes = adminIsAuthenticated ? adminAuthenticatedRoutes : adminGuestRoutes;
  const userRoutes = userIsAuthenticated ? userAuthenticatedRoutes : userGuestRoutes;

  const routes = [...adminRoutes, ...userRoutes, ...commonRoutes];

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