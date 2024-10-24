import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";
import useQuery from "@/hooks/useQuery";
import { setCategories } from "@/redux/slices/category-slice";
import { useAppDispatch } from "@/redux/hooks";
import { Suspense, useEffect, useState } from "react";
import { Outlet  } from "react-router-dom";
import { useScreenDetector } from "@/hooks/useScreenDetector";
import '../styles/admin-global.css';

const AdminLayout = () => {
  const { data } = useQuery('admin/categories?limit=400');
  const dispatch = useAppDispatch();

  const {isMobile} = useScreenDetector();

  const [navbarTitle, setNavbarTitle] = useState('App');

  const updateNavbarTitle = (newTitle:string) => {
    setNavbarTitle(newTitle);
  };

 useEffect(() => {
    if (data?.categories.data) {
      dispatch(setCategories(data.categories.data));
    }
  }, [data]);
  return (
    <div className="flex pt-8 h-screen max-h-screen  pb-10  px-6  lg:px-0 bg-[#f5f5f5] dark:bg-background">

      {
        !isMobile && (
          <div className="hidden lg:w-[10%] min-w-[160px] lg:flex justify-center items-center ">
            <Sidebar />
          </div>
        )
      }

      <div className="w-full lg:w-[90%] lg:pe-8 ">

        <div className="flex flex-col gap-8 md:gap-4 w-full h-full  rounded-lg bg-transparent">

          <Navbar title={navbarTitle} />

            <div className="flex flex-col sm:gap-4 h-full overflow-y-scroll ">
              <Suspense fallback={<div>Loading...</div>}>
                <Outlet context={{ updateNavbarTitle }}/>
              </Suspense>
            </div>

        </div>

      </div>

    </div>
  )
}


export default AdminLayout