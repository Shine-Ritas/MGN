import MonthPicker from "@/components/ui/month-picker"
import { useState } from "react"
import { TargetRadial } from "./revenue-growth/target-radial"
import { PackageChart } from "./revenue-growth/package-chart"
import { PackageBarChart } from "./revenue-growth/package-bar-chart"
import { IncomeChart } from "./revenue-growth/income-chart"
import useQuery from "@/hooks/useQuery"

const RevenueGrowth = () => {

    const [date, setDate] = useState<Date | undefined>(new Date())

    const { data, isLoading } = useQuery("/admin/dashboard/revenue-growth?date=" + date?.toISOString());

    return (
        <>
            <div className="flex justify-end">
                <MonthPicker
                    date={date}
                    setDate={setDate}
                />
            </div>

            <div className="grid">
                {!isLoading && <IncomeChart chartData={data?.revenue_by_days_of_the_month}/>}
            </div>

            <div className="grid grid-cols-3 gap-3">
                {!isLoading && <TargetRadial chartData={data?.monthly_subscriptions}/>}
                <PackageChart />
                {!isLoading && <PackageBarChart chartData={data?.count_by_subscriptions} />}
            </div>

        </>
    )
}

export default RevenueGrowth
