import { Bar, BarChart, CartesianGrid, Cell, LabelList } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
} satisfies ChartConfig

export function RegistrationChart({ chartData = [] }: { chartData: Array<{ key: string; count: number }> }) {
  const currentYear = new Date().getFullYear()

  if (!Array.isArray(chartData) || chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Registration By Months</CardTitle>
          <CardDescription>No data available</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={[]}> 
              <CartesianGrid vertical={false} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="leading-none text-muted-foreground">
            No registrations recorded for the selected period
          </div>
        </CardFooter>
      </Card>
    )
  }

  const start_month = chartData[chartData.length - 1]?.key ?? ""
  const end_month = chartData[0]?.key ?? ""

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Registration By Months</CardTitle>
        <CardDescription>{end_month} - {start_month} {currentYear}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel hideIndicator />}
            />
            <Bar dataKey="count">
              <LabelList position="top" dataKey="key" 
              fill="white"
              fillOpacity={1} />
              {chartData.map((item) => (
                <Cell
                  key={item.key}
                  fill={
                    item.count > 0
                      ? "hsl(var(--chart-neon-primary))"
                      : "hsl(var(--chart-primary))"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
