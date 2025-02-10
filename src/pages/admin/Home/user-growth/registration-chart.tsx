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

export function RegistrationChart({chartData}) {

  const start_month = chartData[0].key
  const end_month = chartData[chartData.length - 1].key

  const currentYear = new Date().getFullYear()
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Regisration By Months</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
        <CardDescription>{start_month} - {end_month} {currentYear}</CardDescription>
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
              <LabelList position="top" dataKey="key" fillOpacity={1} />
              {chartData.map((item) => (
                <Cell
                  key={item.key}
                  fill={
                    item.count > 0
                      ? "hsl(var(--chart-1))"
                      : "hsl(var(--chart-2))"
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
