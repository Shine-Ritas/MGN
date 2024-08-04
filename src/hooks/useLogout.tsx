import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { useCallback } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { adminLogout } from "@/redux/slices/admin-auth-slice";
import useSecureStorage from "./useSecureStorage";

const useLogout = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const {get} = useSecureStorage();


  const logout = useCallback((withToast=true,type="admin") => {
    const navigateTo = get("auth-type") === "admin" ? '/admin/login' : '/login';
    localStorage.removeItem('auth-token');
    localStorage.removeItem("expiresAt");
    localStorage.removeItem("auth-type");

    withToast && toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
      variant: "destructive",
    });
    dispatch(adminLogout())
    navigate(navigateTo);
  }, [navigate]);

  return logout;
}

export default useLogout;
