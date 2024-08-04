import { CircleUser, Menu } from "lucide-react"
import { Sheet , SheetTrigger } from "../ui/sheet"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../ui/dropdown-menu"
import Logo from "@/assets/imgs/logo-icon.png";
import { Link } from "react-router-dom"
import { useTheme } from "../theme-provider"
import { DropdownMenuSub } from "@radix-ui/react-dropdown-menu"
import useSafeContent from "@/hooks/useSafeContent"
import { Switch } from "../ui/switch"
import { Label } from "../ui/label"
import { DesktopNavigation } from "./DesktopNavigation";
import { lazy } from "react";
import { useScreenDetector } from "@/hooks/useScreenDetector";
import { Badge } from "../ui/badge";

const MobileSidebarSheet = lazy(() => import('./MobileSidebarSheet'));

const Navbar = () => {

    

    const { setTheme } = useTheme();

    const { safeContent, toggleSafeContent } = useSafeContent();

   const {isMobile} = useScreenDetector();


    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-24 z-[100]">
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link
                    to="/"
                    className=""
                >
                    <img src={Logo} alt="logo" className="w-52 hover:motion-safe:animate-spin-slow cursor-pointer" />
                </Link>
                {
                   !isMobile && <DesktopNavigation /> 
                }
            </nav>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                {
                    isMobile && <MobileSidebarSheet />
                }
            </Sheet>
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">



                <div className="ml-auto sm:flex-initial">
                    <div className="flex items-center gap-3">
                        <Label className="text-muted-foreground">Safe Content</Label>
                        <Switch
                            checked={safeContent}
                            onCheckedChange={toggleSafeContent}
                        />
                    </div>
                </div>
                <div className="">
                    <Badge variant={"gold"} >Gold</Badge>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="rounded-full">
                            <CircleUser className="h-5 w-5" />
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    {
                        false ? (<DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>

                            <DropdownMenuSub>

                                <DropdownMenuSubTrigger className="flex items-center px-2 font-bold">
                                    <span className="text-sm flex  items-center justify-between w-full"> Theme

                                    </span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent className="DropdownMenuContent" sideOffset={10}>
                                        <DropdownMenuItem onClick={() => setTheme("light")}>
                                            Light
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                                            Dark
                                        </DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>

                            </DropdownMenuSub>


                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                        ) : (<DropdownMenuContent className="z-[300]" align="end">
                            <DropdownMenuItem>
                                <Link to="/login" >Login</Link>
                            </DropdownMenuItem>

                        </DropdownMenuContent>)

                    }
                </DropdownMenu>


            </div>
        </header>
    )
}

export default Navbar