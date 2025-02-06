import useQuery from "@/hooks/useQuery"
import { RegistrationChart } from "./user-growth/registration-chart"
import { UserLocations } from "./user-growth/user-location-chart"
import { UserLoginChart } from "./user-growth/user-login-chart"
import { UserSubscriptionChart } from "./user-growth/user-subscription-chart"

const UserGrowth = () => {

    const {data:user_chart,isLoading:u_Loading} = useQuery("/admin/dashboard/user-locations");
    const {data:registration_chart, isLoading:r_loading} = useQuery("/admin/dashboard/user-registrations");
    const {data:login_chart, isLoading:l_loading} = useQuery("/admin/dashboard/user-logins");

  return (
    <>
    <div className="grid">
        <UserSubscriptionChart />
    </div>
    <div className="grid gap-4 sm:grid-cols-3">
        {!r_loading && <RegistrationChart chartData={registration_chart}/>}
        {!u_Loading && <UserLocations chartData={user_chart}/>}
        {!l_loading && <UserLoginChart chartData={login_chart}/>}
    </div>
    </>
  )
}

export default UserGrowth
