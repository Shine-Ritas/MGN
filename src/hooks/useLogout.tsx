import { toast } from "@/components/ui/use-toast";
import { useCallback, useMemo } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { adminLogout } from "@/redux/slices/admin-auth-slice";
import useSecureStorage from "./useSecureStorage";

const useLogout = () => {

  const dispatch = useAppDispatch();
  const {get,remove} = useSecureStorage();

  const logout = useCallback((withToast=true) => {
    const navigateTo = get("auth-type") === "admin" ? '/admin/login' : '/login';
   
    remove(["auth-token", "expiresAt", "auth-type", "user",'auth-role','auth-permissions']);

    withToast && toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
      variant: "destructive",
    });
    dispatch(adminLogout())

    setTimeout(()=>{
      window.location.href = navigateTo;
    },2000);
  }, [dispatch, get]);

  return useMemo(() => logout, [logout]);
}

export default useLogout;
