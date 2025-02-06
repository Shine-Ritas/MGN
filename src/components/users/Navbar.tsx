import { CircleUser, Menu, Search } from "lucide-react"
import { Sheet, SheetTrigger } from "../ui/sheet"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import Logo from "@/assets/imgs/logo-icon.png";
import { Link } from "react-router-dom"
import useSafeContent from "@/hooks/useSafeContent"
import { Switch } from "../ui/switch"
import { Label } from "../ui/label"
import { DesktopNavigation } from "./DesktopNavigation";
import { lazy } from "react";
import { useScreenDetector } from "@/hooks/useScreenDetector";
import { Badge } from "../ui/badge";
import { useUserAppDispatch, useUserAppSelector } from "@/redux/hooks";
import { selectAuthUser } from "@/redux/slices/user-global";
import { userRouteCollection } from "@/routes/data/user_route";
import useLogout from "@/hooks/useLogout";
import AlertBox from "../ui/AlertBox";
import { isSubscriptionExpired } from "@/utilities/util";
import { selectHeaderVisible } from "@/redux/slices/userReadSetting/selectors";
import { toggleValue } from "@/redux/slices/userReadSetting/user-read-setting-slice";
import { Input } from "../ui/input";

const MobileSidebarSheet = lazy(() => import('./MobileSidebarSheet'));

const Navbar = ({ isReadMode }: { isReadMode: boolean }) => {

    const dispatch = useUserAppDispatch();


    const { safeContent, toggleSafeContent } = useSafeContent();

    const { isMobile } = useScreenDetector();

    const visibility = useUserAppSelector(selectHeaderVisible);

    const authUser = useUserAppSelector(selectAuthUser);

    const logout = useLogout();

    const subscriptionStatus = isSubscriptionExpired(authUser?.subscription_end_date, authUser?.subscription_name);

    return (
        <header className={`w-4/4 sticky ${visibility.value} transition-all  flex min-h-20 items-center gap-4 border-b bg-background px-4 md:px-24 z-[100] `}>
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link
                    to="/"
                    className=""
                >
                    <img src={Logo} alt="logo" className="w-40 md:w-60 hover:motion-safe:animate-spin-slow cursor-pointer" />
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

                <div className="ml-auto flex gap-4   sm:flex-initial">
                    {
                        !isMobile && (
                            <div className="relative">
                                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                <Input
                                    type="text"
                                    placeholder="Search..."
                                    className="pl-8 hidden md:block md:w-80 transition-all"
                                />
                            </div>
                        )
                    }
                    <div className="flex items-center gap-3">
                        <Label
                            aria-label="Safe Content"
                            className="text-muted-foreground
                            whitespace-nowrap">Safe Content</Label>
                        <Switch
                            aria-label="Safe Content"
                            checked={safeContent}
                            onCheckedChange={toggleSafeContent}
                        />
                    </div>
                </div>
                {
                    authUser && (
                        <div className="">
                            <Badge variant={subscriptionStatus?.variant} >
                                {
                                    subscriptionStatus?.message
                                }
                            </Badge>
                        </div>
                    )
                }
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="rounded-full">
                            <CircleUser className="h-5 w-5" />
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    {
                        authUser ? (<DropdownMenuContent align="end" className="z-[999]">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="w-full">
                                <Link className="w-full" to={userRouteCollection.user_profile}>Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>

                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="font-bold w-full" asChild>
                                <AlertBox alertTitle="Logout" alertDescription="Are you sure you want to logout?" alertActionConfirmText="Logout" alertConfirmAction={logout}
                                    btnText={<>Logout</>} />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                        ) : (<DropdownMenuContent className="z-[300]" align="end">
                            <DropdownMenuItem >
                                <a className="w-full" href="/login" >Login</a>
                            </DropdownMenuItem>

                        </DropdownMenuContent>)

                    }
                </DropdownMenu>

                {
                    isReadMode && (
                        <div className="">
                            <Button
                                onClick={() => dispatch(toggleValue("showPanel"))}
                            >
                                Menu
                            </Button>
                        </div>
                    )
                }
            </div>
        </header>
    )
}

export default Navbar