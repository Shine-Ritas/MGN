
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

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


const chartConfig = {
  total: {
    label: "total",
    color: "hsl(var(--chart-neon-primary))",
  },
} satisfies ChartConfig

export function PackageBarChart({chartData}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Totals By Subscription Types</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="title"
              tickLine={true}
              tickMargin={10}
              tick={{ fontSize: 12 }}
              angle={-14}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 9) }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="total" fill="var(--color-total)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    
    </Card>
  )
}
