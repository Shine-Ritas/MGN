import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

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
  chapters: {
    label: "Chapters",
    color: "hsl(var(--chart-neon-primary))",
  },
} satisfies ChartConfig

export function MostUploadedAdmin({chartData}) {
  return (
    <Card>
      <CardHeader className="items-center">
        <CardTitle>Total Chapters Uploaded By Admins</CardTitle>
        <CardDescription>
          Showing total chapters uploaded for the last this month
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] min-w-full"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="name" />
            <PolarGrid />
            <Radar
              dataKey="chapters"
              fill="var(--color-chapters)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
