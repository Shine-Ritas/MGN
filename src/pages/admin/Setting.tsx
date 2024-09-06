
import {
    Card,
    CardContent,

} from "@/components/ui/card"
import { adminRouteCollection } from "@/constants/constants"
import { Suspense } from "react"

import { Link, Outlet } from "react-router-dom"

const Setting = () => {

    return (

        <main className="grid lg:grid-cols-5 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
            <div className="lg:col-span-1">
                <Card className="pt-4">
                    <CardContent>
                        <nav
                            className="grid grid-cols-5 lg:grid-cols-1 gap-4 text-sm text-muted-foreground "
                        >
                            <Link to={adminRouteCollection.generalSetting} className="font-semibold text-primary">
                                General
                            </Link>
                            <Link  to={adminRouteCollection.generalBanner}>Banner</Link>
                            <Link to="#">Integrations</Link>
                            <Link to="#">Support</Link>
                            <Link to="#">Organizations</Link>
                            <Link to="#">Advanced</Link>
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