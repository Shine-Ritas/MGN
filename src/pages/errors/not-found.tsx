import { Button } from '@/components/ui/button';
import "@/styles/admin-global.css";
import useAuth from '@/hooks/useAuth';
import { useState, useEffect } from 'react';

export default function NotFoundError() {
  const [redirectConfig, setRedirectConfig] = useState({
    label: "Go Home",
    path: "/"
  });

  const navigate = (path: string | number) => {
    if (typeof path === 'string') {
      window.location.href = path;
    } else {
      window.history.go(path);
    }
  };

  const isUserAuth = useAuth({ adminGuard: false });
  const isAdminAuth = useAuth({ adminGuard: true });

  const isOnAdminRoute = window.location.pathname.includes('/admin');

  useEffect(() => {
    if (!isAdminAuth && isOnAdminRoute) {
      setRedirectConfig({
        label: "Admin Login",
        path: "/admin/login"
      });
    } else if (!isUserAuth && !isOnAdminRoute) {
      setRedirectConfig({
        label: "Login",
        path: "/login"
      });
    } else {
      setRedirectConfig({
        label: "Go Home",
        path: "/"
      });
    }
  }, [isAdminAuth, isUserAuth, isOnAdminRoute]);

  return (
    <div className='h-svh'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        <h1 className='text-[7rem] font-bold leading-tight'>404</h1>
        <span className='font-medium'>Oops! Page Not Found!</span>
        <p className='text-center text-muted-foreground'>
          It seems like the page you're looking for <br />
          does not exist or might have been removed.
        </p>
        <div className='mt-6 flex gap-4'>
          <Button onClick={() => navigate(redirectConfig.path)}>{redirectConfig.label}</Button>
          <Button variant='outline' onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
