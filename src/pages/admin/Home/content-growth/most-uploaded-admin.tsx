import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  chapters: {
    label: "Chapters",
    color: "hsl(var(--chart-neon-primary))",
  },
} satisfies ChartConfig;

export function MostUploadedAdmin({ chartData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Chapters Uploaded By Admins</CardTitle>
        <CardDescription>
          Showing total chapters uploaded for this month
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        {/* Check if chartData is empty */}
        {!chartData || chartData.length === 0 ? (
          <div className="flex items-center justify-center h-[150px] text-center">
            <p className="text-muted-foreground">
              No data available for this month.
            </p>
          </div>
        ) : (
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
        )}
      </CardContent>
    </Card>
  );
}