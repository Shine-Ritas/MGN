import Sidebar from "@/components/admin/Sidebar";
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/admin/Navbar";
import useQuery from "@/hooks/useQuery";
import { setCategories } from "@/redux/slices/category-slice";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";

type AdminLayoutProps = {
  children: React.ReactNode;
  title: string;
};

const AdminLayout = ({ children, title = "" }: AdminLayoutProps) => {

  const windowWidth = window.innerWidth;

    const { data } = useQuery('admin/categories?limit=400');
    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(setCategories(data?.categories.data));
    },[data])

  return (
    <div className="flex max-h-screen md:overflow-scroll ">

      {
        windowWidth > 768 && (
          <div className="hidden md:w-[10%] min-w-[160px] md:flex justify-center sticky top-2 left-0 items-center ">
          <Sidebar />
        </div>
        )
      }

      <div className="w-full md:w-[90%] pt-10 md:pe-20 h-screen">

        <div className="flex flex-col gap-8 w-full pt-2">

          <Navbar title={title} />

          <div className="flex w-full flex-col ">

            <div className="flex flex-col sm:gap-4 pb-8 md:pb-12 ">
              {children}

            </div>

          </div>
        </div>

      </div>

      <Toaster />
    </div>
  )
}

export default AdminLayout