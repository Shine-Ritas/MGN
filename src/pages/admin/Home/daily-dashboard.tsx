import { StatsCard } from "@/components/ui/stats-card"
import useQuery from "@/hooks/useQuery";
import { Activity, BarChart3, DollarSign, Users } from "lucide-react"

import ShowTime from "./daily/show-time";
import StorageCard from "./daily/storage-card";
import TodayChapterTrafficLinear from "./daily/today-chapter-traffice-linear";


const DailyDashboard = () => {

  const { isLoading, data } = useQuery(`admin/dashboard/daily-stats`);


  return (
    <>

      <div className="grid grid-cols-4 gap-3">
        <StatsCard
          title="Today's Traffic"
          value={data?.traffics?.current}
          description="Visitors today"
          icon={BarChart3}
          trend={{ value: data?.traffics?.percentage, isPositive: data?.traffics?.status == "success" }}
          color="violet"
          formatter={(val) => val.toLocaleString()}
        />

        <StatsCard
          title="Users"
          value={data?.users?.current}
          description="New Registered Users today"
          icon={Users}
          trend={{ value: data?.users?.percentage, isPositive: data?.users?.status == "success" }}
          color="cyan"
          formatter={(val) => val.toLocaleString()}
        />

        <StatsCard
          title="Subscriptions"
          value={data?.subscriptions?.current}
          description="New Subscriptions today"
          icon={Activity}
          trend={{ value: data?.subscriptions?.percentage, isPositive: data?.subscriptions?.status == "success" }}
          color="amber"
          formatter={(val) => val.toLocaleString()}

        />

        <StatsCard
          title="Revenue"
          value={data?.revenue?.current}
          description="Total revenue today"
          icon={DollarSign}
          trend={{ value: data?.revenue?.percentage, isPositive: data?.revenue?.status == "success" }}
          color="green"
          formatter={(val) => val.toLocaleString()}

        />

      </div>

      <div className="grid grid-cols-4 gap-4 ">
        <TodayChapterTrafficLinear chartData={data?.traffic_by_chapters} />

        <div className="grid col-span-2 gird-rows-2 gap-3">
          <ShowTime upTime={data?.up_time} timeZone={data?.time_zone} />
          {!isLoading && <StorageCard percentage={(data?.disk_used_percentage).toFixed(2)} total={data?.disk_space} used={data?.disk_space_used} />}
        </div>

        {/* <DailyStat /> */}
      </div>
    </>
  )
}

export default DailyDashboard
