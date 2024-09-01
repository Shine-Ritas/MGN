import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";
import useQuery from "@/hooks/useQuery";
import { setCategories } from "@/redux/slices/category-slice";
import { useAppDispatch } from "@/redux/hooks";
import { Suspense, useEffect } from "react";
import { Outlet  } from "react-router-dom";
import { useScreenDetector } from "@/hooks/useScreenDetector";
import '../styles/admin-global.css';

const AdminLayout = () => {


  const { data } = useQuery('admin/categories?limit=400');
  const dispatch = useAppDispatch();

  const {isMobile} = useScreenDetector();

 useEffect(() => {
    if (data?.categories.data) {
      dispatch(setCategories(data.categories.data));
    }
  }, [data]);
  return (
    <div className="flex pt-12 h-screen max-h-screen  pb-20 ">

      {
        !isMobile && (
          <div className="hidden md:w-[10%] min-w-[160px] md:flex justify-center items-center ">
            <Sidebar />
          </div>
        )
      }

      <div className="w-full md:w-[90%]  md:pe-20 ">

        <div className="flex flex-col gap-8 md:gap-4 w-full h-full">

          <Navbar title={"something"} />

            <div className="flex flex-col sm:gap-4h-full ">
              <Suspense fallback={<div>Loading...</div>}>
                <Outlet />
              </Suspense>
            </div>

        </div>

      </div>

    </div>
  )
}


export default AdminLayout