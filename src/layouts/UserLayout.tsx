import Navbar from "@/components/users/Navbar";
import UserLayoutFooter from "./UserLayoutFooter";
import useQuery from "@/hooks/useQuery";
import '../styles/user-global.css';

import { useUserAppDispatch, useUserAppSelector } from "@/redux/hooks";
import { lazy, useEffect, useState } from "react";
import { setCategories } from "@/redux/slices/category-slice";
import { Outlet ,useLocation } from "react-router-dom";
import { selectIsMaintenance, setBanners } from "@/redux/slices/user-global";
import MaintenancePage from "@/pages/errors/maitainence";
import { selectReadSettingPanel } from "@/redux/slices/userReadSetting/selectors";
import { useScreenDetector } from "@/hooks/useScreenDetector";

const DetailDrawer = lazy(() => import('@/pages/users/Detail/detail-drawer'));

const UserLayout = () => {
  const userIsMaintenance = useUserAppSelector(selectIsMaintenance); // Maintenance state
  const [isReadMode, setIsReadMode] = useState(false);
  const { data } = useQuery('public/categories?limit=400');
  const { data: banners } = useQuery(`users/banners`);
  const location = useLocation(); 
  const {isMobile} = useScreenDetector();


  const isMenuOpen = useUserAppSelector(selectReadSettingPanel);
  const dispatch = useUserAppDispatch();
  const containerWidth = (!isMobile && isMenuOpen) ? 'w-4/5 ' : 'w-full';

  useEffect(() => {
    if (location.pathname.includes("read")) {
      setIsReadMode(true);
    } else {
      setIsReadMode(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    dispatch(setCategories(data?.categories.data));
  }, [data, dispatch]);

  useEffect(() => {
    dispatch(setBanners(banners?.banners));
  }, [banners, dispatch]);


  // If the user-side maintenance mode is active, show the MaintenancePage component
  if (userIsMaintenance) {
    return <MaintenancePage />;
  }

  return (
    <div className="flex h-screen">
      <div className={`flex h-fit flex-col md:px-0 transition-all ${containerWidth}`}>
        <Navbar isReadMode={isReadMode} />
        <div className="w-full ">
          <div className="flex flex-col gap-8 w-full ">
            <div className="flex w-full flex-col">
              <div className="flex flex-col sm:gap-4 min-h-[65vh]">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
        {!isReadMode && <UserLayoutFooter />}
      </div>
      {isReadMode && <DetailDrawer />}
    </div>
  );
};

export default UserLayout;
