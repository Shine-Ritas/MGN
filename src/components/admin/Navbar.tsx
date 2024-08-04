import AdminUserDropDown from "@/components/ui/AdminUserDropDown"
import { lazy, memo } from "react";
import CommandSearch from "./CommandSearch";
import Logo from "@/assets/imgs/logo-icon.png";
import LogoTitle from "@/assets/imgs/logo-title.png";
type NavbarProps = {
  title: string
}
const MobileDrawer = lazy(() => import('./MobileDrawer'))

const NavbarRaw = ({ title }: NavbarProps) => {

  const windowWidth = window.innerWidth;


  return (
    <div className="flex min-w-full justify-between px-4">
      <div className="flex items-center gap-10">

        {windowWidth <= 768 ?(  
          <div className="flex items-center gap-0">
          <img src={Logo} alt="logo" className="w-12 hover:motion-safe:animate-spin-slow cursor-pointer " />
          <img src={LogoTitle} alt="logo-title" className="w-16  cursor-pointer " />
          </div>
        ) :
        (
          <h1 className="text-3xl font-bold">{title}</h1>
        )}

      </div>
      <div className="w-fit flex gap-0 items-center justify-between">
        <div className="relative ml-auto hidden md:flex md:grow-0 ">
          {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          /> */}

          <CommandSearch />
        </div>
        
        {
          windowWidth <= 768 && (
            <MobileDrawer />
          )
        }

        <AdminUserDropDown />
      </div>
    </div>
  )
}

const Navbar = memo(NavbarRaw)

export default Navbar