import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


// {
//   "label": "Week 1",
//   "revenue": 2409000
// }

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-primary))",
  },
} satisfies ChartConfig

export function PackageChart({chartData}) {
  const dateRange = chartData && chartData.length > 0 
    ? `${chartData[0]?.label} - ${chartData[chartData.length - 1]?.label}`
    : "No data available";

  return (
    <Card> 
      <CardHeader>
        <CardTitle>Line Chart - Multiple</CardTitle>
        <CardDescription>{dateRange}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="revenue"
              type="monotone"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    
    </Card>
  )
}
