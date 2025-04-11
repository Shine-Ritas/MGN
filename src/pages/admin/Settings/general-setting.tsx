import { Button } from "@/components/ui/button"
import MaintenanceAction from "./General/maintenance-action"
import useQuery from "@/hooks/useQuery"
import ApplicationEdit from "./General/application-edit"
import SocialAction from "./General/social-action"

const GeneralSetting = () => {
    const { data, isLoading } = useQuery(`/application-configs`);

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">

                <div className="grid auto-rows-max items-start gap-4 grid-cols-5 lg:col-span-5 lg:gap-8">

                    <ApplicationEdit applicationConfig={data} />
                    <div className="col-span-2 flex flex-col gap-8">
                    <MaintenanceAction isActive={data?.user_side_is_maintenance_mode} />
                    <SocialAction />
                    </div>
                </div>

                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">



                </div>
            </div>

            <div className="flex items-center justify-center gap-2 md:hidden mt-4">
                <Button variant="outline" size="sm">
                    Discard
                </Button>
                <Button size="sm">Apply</Button>
            </div>
        </div>
    )
}

export default GeneralSetting