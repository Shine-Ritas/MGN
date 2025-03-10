import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

const TodayChapterTrafficLinear = ({chartData}) => {
  return (
    <Card className="row-span-1 col-span-2">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg font-medium flex items-center">
        <TrendingUp className="mr-2 h-5 w-5 text-gray-400" />
        Today's Traffic
      </CardTitle>
      <CardDescription className="text-gray-400">
        Visitors today
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {chartData?.map((chapter, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-medium">{chapter.sub_mogou_title} ({chapter.mogou_title} )</div>
              <div className="text-sm text-gray-400">{chapter.today_views} visitors</div>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary-muted to-neon-primary h-2 rounded-full"
                style={{ width: `${chapter.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
  )
}

export default TodayChapterTrafficLinear
