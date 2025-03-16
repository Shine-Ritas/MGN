import { lazy, memo } from "react";
import Logo from "@/assets/imgs/logo-icon.png";
import LogoTitle from "@/assets/imgs/logo-title.png";
import { useScreenDetector } from "@/hooks/useScreenDetector";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import {  Globe } from "lucide-react";
import { selectApplicationConfig } from "@/redux/slices/application-config-slice";
import { useSelector } from "react-redux";

const CommandSearch = lazy(() => import('./CommandSearch'))
const AdminUserDropDown = lazy(() => import('@/components/ui/AdminUserDropDown'))

type NavbarProps = {
  title: string
}
const MobileDrawer = lazy(() => import('./MobileDrawer'))

const NavbarRaw = ({ title }: NavbarProps) => {
  const {isMobile} = useScreenDetector();
  const applicationConfig = useSelector(selectApplicationConfig);

  console.log(applicationConfig)

  return (
    <Card className="flex min-w-full justify-between px-4 md:h-[4vh] py-8" >
      <div className="flex items-center gap-10">

        {!isMobile ?(  
          <div className="flex items-center gap-0">
          <img src={Logo} alt="logo" className="w-8 hover:motion-safe:animate-spin-slow cursor-pointer " />
          <h4 className="text-neon-primary font-bold text-lg">{applicationConfig?.title}</h4>
          </div>
        ) :
        (
          <h1 className="text-3xl font-bold">{title}</h1>
        )}

      </div>
      <div className="w-fit flex gap-3 items-center justify-between">
        <Button 
        onClick={() => window.location.href = "/"}
        className="">
         <Globe className="w-4 h-4" />
        </Button>
        <div className="relative ml-auto hidden md:flex md:grow-0 ">
          {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          /> */}

          {/* button with global icon */}
      

          <CommandSearch />
        </div>
        
        {
          isMobile && (
            <MobileDrawer />
          )
        }

        <AdminUserDropDown />
      </div>
    </Card>
  )
}

const Navbar = memo(NavbarRaw)

export default Navbar