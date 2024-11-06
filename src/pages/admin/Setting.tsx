
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { Suspense } from "react"
import { NavLink, Outlet } from "react-router-dom"
import { setting_routes } from "./Settings"
const Setting = () => {
    return (
        <main className="grid lg:grid-cols-5 items-start gap-4 pt-4  md:gap-4 ">
            <div className="lg:col-span-1">
                <Card className="pt-4">
                    <CardContent>

                        <nav className="grid grid-cols-5 lg:grid-cols-1 gap-4 text-sm">
                            {
                                setting_routes.children?.map((route) => (
                                    <NavLink
                                        key={route.path}
                                        to={route.path !}
                                        className={({ isActive }) => isActive ? 'active-nav-link' : ''}
                                    >
                                        {route.label}
                                    </NavLink>
                                ))
                            }
                        </nav>

                    </CardContent>
                </Card>

            </div>
            <div className="w-full gap-4 lg:col-span-4 lg:max-h-[80vh] lg:overflow-y-scroll lg:pe-2 pb-4">
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet />
                </Suspense>
            </div>
        </main>
    )
}
export default Setting