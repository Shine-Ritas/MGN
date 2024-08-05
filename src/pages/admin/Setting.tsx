
import {
    Card,
    CardContent,

} from "@/components/ui/card"
import { adminRouteCollection } from "@/constants/constants"

import { Link, Outlet } from "react-router-dom"

const Setting = () => {

    return (

        <main className="grid grid-cols-5 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="col-span-1">
                <Card className="pt-4">
                    <CardContent>
                        <nav
                            className="grid gap-4 text-sm text-muted-foreground "
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
            <div className="w-full gap-4 col-span-4">
                <Outlet />
            </div>
        </main>

    )

}

export default Setting