import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ArrowUpIcon, ArrowDownIcon, PrinterIcon } from "lucide-react";
import { FaChartArea } from "react-icons/fa6";
import useQuery from "@/hooks/useQuery";
import { ScrollArea } from "@/components/ui/scroll-area";

const getColorForPackage = (index) => `hsl(${index * 60}, 70%, 50%)`;

export default function SubscriptionAnalysis() {
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading } = useQuery("/admin/subscription-analysis");

  if (!data || isLoading) {
    return <div>Loading...</div>;
  }

  const subscriptionData = data.subscription_analysis;

  const handlePrint = () => {

    window.print();
    window.close();

  };


  // Prepare chart data dynamically based on package names
  const packageNames = Object.keys(subscriptionData.previous_month.packages);
  const chartData = [
    {
      month: "Previous",
      ...packageNames.reduce((acc, packageName) => {
        acc[packageName] = subscriptionData.previous_month.packages[packageName];
        return acc;
      }, {}),
    },
    {
      month: "Current",
      ...packageNames.reduce((acc, packageName) => {
        acc[packageName] = subscriptionData.current_month.packages[packageName];
        return acc;
      }, {}),
    },
  ];

  const getMostPopularPackage = (data: { get_popularity: Record<string, number> }) => {
    return Object.entries(data.get_popularity).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
  };

  const getLeastPopularPackage = (data: { get_popularity: Record<string, number> }) => {
    return Object.entries(data.get_popularity).reduce((a, b) => (a[1] < b[1] ? a : b))[0];
  };

  const mostPopularPackage = getMostPopularPackage(subscriptionData);
  const leastPopularPackage = getLeastPopularPackage(subscriptionData);

  const profitChange = subscriptionData.current_month.total_profit - subscriptionData.previous_month.total_profit;
  const profitChangePercentage = (profitChange / subscriptionData.previous_month.total_profit) * 100;

  return (
    <>
      <Button variant={"secondary"} onClick={() => setIsOpen(true)} size={"sm"} className="text-white">
        <FaChartArea />
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-[70vw] w-full" id="printDiv">
        <ScrollArea>
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
                    <div className="text-2xl font-bold">${subscriptionData.current_month.total_profit.toLocaleString()}</div>
                    <div className={`flex items-center ${profitChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {profitChange >= 0 ? <ArrowUpIcon className="mr-1" /> : <ArrowDownIcon className="mr-1" />}
                      {Math.abs(profitChangePercentage).toFixed(2)}% from last month
                    </div>
                    <div className="text-sm text-gray-500">Previous month: ${subscriptionData.previous_month.total_profit.toLocaleString()}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Package Popularity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <strong>Most Popular:</strong> {mostPopularPackage} (
                      {subscriptionData.get_popularity[mostPopularPackage]} subscribers)
                    </div>
                    <div>
                      <strong>Least Popular:</strong> {leastPopularPackage} (
                      {subscriptionData.get_popularity[leastPopularPackage]} subscribers)
                    </div>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex gap-4 items-center">
                    Subscription Trends
                    <span onClick={handlePrint} className="cursor-pointer text-gray-500 hover:text-gray-700">
                      <PrinterIcon className="w-6 h-6" />
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[430px]">
                  <ChartContainer
                    config={packageNames.reduce((acc, packageName, index) => {
                      acc[packageName] = {
                        label: packageName,
                        color: getColorForPackage(index),
                      };
                      return acc;
                    }, {})}
                  >
                    <BarChart data={chartData} className="!h-[400px]">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      {packageNames.map((packageName, index) => (
                        <Bar key={packageName} dataKey={packageName} fill={getColorForPackage(index)} />
                      ))}
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
        </ScrollArea>
          </DialogContent>
      </Dialog>
    </>
  );
}
