import MaintenanceAction from "./General/maintenance-action"
import useQuery from "@/hooks/useQuery"
import ApplicationEdit from "./General/application-edit"
import SocialAction from "./General/social-action"
import UserAuthImage from "./General/user-auth-image"
import { useScreenDetector } from "@/hooks/useScreenDetector"

const GeneralSetting = () => {
    const { data, isLoading } = useQuery(`/application-configs`);
    const { isMobile } = useScreenDetector();

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className=" md:p-6">
            {isMobile ? (
                // Mobile: Stack all components vertically
                <div className="flex flex-col gap-4">
                    <ApplicationEdit applicationConfig={data} />
                    <MaintenanceAction isActive={data?.user_side_is_maintenance_mode} />
                    <SocialAction />
                    <UserAuthImage applicationConfig={data} />
                </div>
            ) : (
                // Desktop: Use grid layout
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-8">
                    <div className="lg:col-span-3">
                        <ApplicationEdit applicationConfig={data} />
                    </div>
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <MaintenanceAction isActive={data?.user_side_is_maintenance_mode} />
                        <SocialAction />
                        <UserAuthImage applicationConfig={data} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default GeneralSetting