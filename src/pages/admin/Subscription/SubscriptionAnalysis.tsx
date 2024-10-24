import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ArrowUpIcon, ArrowDownIcon, PrinterIcon } from "lucide-react"
import { FaChartArea } from "react-icons/fa6"

// Mock data for demonstration
const subscriptionData = {
  previousMonth: {
    totalUsers: 1000,
    totalProfit: 50000,
    packages: {
      basic: 400,
      pro: 350,
      enterprise: 250,
    },
  },
  currentMonth: {
    totalUsers: 1200,
    totalProfit: 62000,
    packages: {
      basic: 450,
      pro: 400,
      enterprise: 350,
    },
  },
}

const packageColors = {
  basic: "hsl(var(--chart-1))",
  pro: "hsl(var(--chart-2))",
  enterprise: "hsl(var(--chart-3))",
}

export default function SubscriptionAnalysis() {
  const [isOpen, setIsOpen] = useState(false)

  const handlePrint = () => {
    window.print()
  }

  const chartData = [
    {
      month: "Previous",
      Basic: subscriptionData.previousMonth.packages.basic,
      Pro: subscriptionData.previousMonth.packages.pro,
      Enterprise: subscriptionData.previousMonth.packages.enterprise,
    },
    {
      month: "Current",
      Basic: subscriptionData.currentMonth.packages.basic,
      Pro: subscriptionData.currentMonth.packages.pro,
      Enterprise: subscriptionData.currentMonth.packages.enterprise,
    },
  ]

  const getMostPopularPackage = (data: { packages: { [key: string]: number } })  => {
    return Object.entries(data.packages).reduce((a, b) => (a[1] > b[1] ? a : b))[0]
  }

  const getLeastPopularPackage = (data: { packages: { [key: string]: number } }) => {
    return Object.entries(data.packages).reduce((a, b) => (a[1] < b[1] ? a : b))[0]
  }

  const profitChange = subscriptionData.currentMonth.totalProfit - subscriptionData.previousMonth.totalProfit
  const profitChangePercentage = (profitChange / subscriptionData.previousMonth.totalProfit) * 100

  return (
    <>
      <Button variant={"secondary"} onClick={() => setIsOpen(true)}
        size={"sm"}
        className="text-white">                
        <FaChartArea />
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[70vw] w-full max-h-[90vh] ">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-4 pt-0">
              <FaChartArea />
              Subscription Analysis
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Profit Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${subscriptionData.currentMonth.totalProfit.toLocaleString()}</div>
                  <div className={`flex items-center ${profitChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {profitChange >= 0 ? <ArrowUpIcon className="mr-1" /> : <ArrowDownIcon className="mr-1" />}
                    {Math.abs(profitChangePercentage).toFixed(2)}% from last month
                  </div>
                  <div className="text-sm text-gray-500">Previous month: ${subscriptionData.previousMonth.totalProfit.toLocaleString()}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Package Popularity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <strong>Most Popular:</strong> {getMostPopularPackage(subscriptionData.currentMonth)} (
                    {subscriptionData.currentMonth.packages[getMostPopularPackage(subscriptionData.currentMonth)]} subscribers)
                  </div>
                  <div>
                    <strong>Least Popular:</strong> {getLeastPopularPackage(subscriptionData.currentMonth)} (
                    {subscriptionData.currentMonth.packages[getLeastPopularPackage(subscriptionData.currentMonth)]} subscribers)
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="flex gap-4 items-center">Subscription Trends
                  <span onClick={handlePrint} className="cursor-pointer text-gray-500 hover:text-gray-700">
                    <PrinterIcon className="w-6 h-6" />
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[430px]">
                <ChartContainer
                  config={{
                    Basic: {
                      label: "Basic",
                      color: packageColors.basic,
                    },
                    Pro: {
                      label: "Pro",
                      color: packageColors.pro,
                    },
                    Enterprise: {
                      label: "Enterprise",
                      color: packageColors.enterprise,
                    },
                  }}
                >
                  <BarChart data={chartData} className="!h-[400px]">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="Basic" fill="var(--color-Basic)" />
                    <Bar dataKey="Pro" fill="var(--color-Pro)" />
                    <Bar dataKey="Enterprise" fill="var(--color-Enterprise)" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

        </DialogContent>
      </Dialog>
    </>
  )
}