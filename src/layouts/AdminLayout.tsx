import Sidebar from "@/components/admin/Sidebar";
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/admin/Navbar";
import useQuery from "@/hooks/useQuery";
import { setCategories } from "@/redux/slices/category-slice";
import { useAppDispatch } from "@/redux/hooks";
import { Suspense, useEffect } from "react";
import { Outlet  } from "react-router-dom";
import { useScreenDetector } from "@/hooks/useScreenDetector";

const AdminLayout = () => {


  const { data } = useQuery('admin/categories?limit=400');
  const dispatch = useAppDispatch();

  const {isMobile} = useScreenDetector();

 useEffect(() => {
    if (data?.categories.data) {
      dispatch(setCategories(data.categories.data));
    }
  }, [data, dispatch]);
  return (
    <div className="flex max-h-screen md:overflow-y-scroll ">

      {
        !isMobile && (
          <div className="hidden md:w-[10%] min-w-[160px] md:flex justify-center sticky top-2 left-0 items-center ">
            <Sidebar />
          </div>
        )
      }

      <div className="w-full md:w-[90%] pt-10 md:pe-20 h-screen">

        <div className="flex flex-col gap-8 w-full pt-2">

          <Navbar title={"something"} />

          <div className="flex w-full flex-col ">

            <div className="flex flex-col sm:gap-4 pb-8 md:pb-12 ">
              <Suspense fallback={<div>Loading...</div>}>
                <Outlet />
              </Suspense>
            </div>

          </div>
        </div>

      </div>

      <Toaster />
    </div>
  )
}


export default AdminLayout