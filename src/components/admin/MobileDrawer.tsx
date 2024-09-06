import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "../ui/button"
import { IoMenu } from "react-icons/io5";
import { navigateMenu } from "@/constants/constants";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useCallback, useState } from "react";
import { SidebarIconProps } from "../ui/SidebarIcon";



const MobileDrawer = () => {

  const [open, setOpen] = useState(false);

  const navigateMenuCollection = navigateMenu;

  const navigate = useNavigate();

  const handleNavigation = useCallback((menu:SidebarIconProps) => {
    navigate(menu.to);
    setOpen(false);
  }, [navigate])

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" onClick={() => setOpen(true)} >
          <IoMenu className="w-6 h-6" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm  pb-10 px-10">
          <DrawerHeader>
            <DrawerTitle>Menu</DrawerTitle>
            {/* <DrawerDescription>Set your daily activity goal.</DrawerDescription> */}
          </DrawerHeader>
          <div className="flex gap-12 flex-wrap">

            {
              Object.keys(navigateMenuCollection).map((key) => {
                const menu = navigateMenuCollection[key];

                return <div key={key} className="grid grid-cols-1 gap-2">
                  <Button asChild size="icon" onClick={() => handleNavigation(menu)} className="w-16 h-16 pt-2 pb-1">
                    <div className="flex flex-col overflow-hidden gap-1">
                      <menu.Icon className="w-8 h-8" />
                      <span className="text-[10px] text-muted-foreground text-wrap ">{
                        menu.title
                      }</span>
                    </div>
                  </Button>


                </div>
              })
            }

          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default MobileDrawer