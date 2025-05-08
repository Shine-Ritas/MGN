import useQuery from "@/hooks/useQuery"
import { RegistrationChart } from "./user-growth/registration-chart"
import { UserLocations } from "./user-growth/user-location-chart"
import { UserLoginChart } from "./user-growth/user-login-chart"
import { UserSubscriptionChart } from "./user-growth/user-subscription-chart"

const UserGrowth = () => {
    const {data,isLoading} = useQuery("/admin/dashboard/user-growth");

  return (
    <>
    <div className="grid">
       {!isLoading && <UserSubscriptionChart chartData={data?.user_traffics}/>}
    </div>
    <div className="grid gap-4 sm:grid-cols-3">
        {!isLoading && <RegistrationChart chartData={data?.registration_chart}/>}
        {!isLoading && <UserLocations chartData={data?.user_chart}/>}
        {!isLoading && <UserLoginChart chartData={data?.login_chart}/>}
    </div>
    </>
  )
}

export default UserGrowth
