import { CircleUser, Menu } from "lucide-react"
import { Sheet, SheetTrigger } from "../ui/sheet"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
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
import { useSelector } from "react-redux";
import { selectApplicationConfig } from "@/redux/slices/application-config-slice";

const MobileSidebarSheet = lazy(() => import('./MobileSidebarSheet'));
const ToSubscribe  = lazy(() => import('@/pages/users/home/subscription/to-subscribe'));

const Navbar = ({ isReadMode }: { isReadMode: boolean }) => {

    const dispatch = useUserAppDispatch();

    const applicationConfig = useSelector(selectApplicationConfig);

    const { safeContent, toggleSafeContent } = useSafeContent();

    const { isMobile } = useScreenDetector();

    const visibility = useUserAppSelector(selectHeaderVisible);

    const authUser = useUserAppSelector(selectAuthUser);

    const logout = useLogout();

    const subscriptionStatus = isSubscriptionExpired(authUser?.subscription_end_date, authUser?.subscription_name);

    return (
        <header className={`w-4/4 sticky ${isReadMode ? visibility.value : ""} transition-all  flex min-h-16 items-center gap-4 border-b bg-background 
        py-3 lg:py-0
        px-4 md:px-12 lg:px-24 z-[80] `}>
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link
                    to="/"
                    className=""
                >
                    <img
                        src={applicationConfig?.logo}
                        alt="logo"
                        className="h-10 w-20 md:h-16 md:w-60 lg:w-28  object-contain cursor-pointer"
                    />
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
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-8">

                <div className="ml-auto flex  sm:flex-initial">

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

            {
                !authUser && !isReadMode && <ToSubscribe />
            }
        </header>
    )
}

export default Navbar