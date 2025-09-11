import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Table, TableHeader,TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table"


const headers = ['#','Chapter Name','Title','Views (24h)','Views (1m)']

const ContentViewRank = ({chartData}) => {
  return (
    <Card className="w-full pt-3">
        <CardTitle className="px-6 text-lg mb-3">
            This Week Popularity
        </CardTitle>
        <CardContent className="px-0 sm:px-6">
            <div className="overflow-x-auto">
                <Table>
                <TableHeader>
                    <TableRow>
                        {
                            headers.map((header, index) => (
                                <TableHead key={index} className="px-2 sm:px-3 text-xs sm:text-sm whitespace-nowrap">
                                    {header}
                                </TableHead>
                            ))
                        }
                    </TableRow>
                </TableHeader>
                <TableBody>
                        {
                            0 == chartData?.length ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8">
                                        No data available
                                    </TableCell>
                                </TableRow>
                            ) : 
                            chartData?.map((data, index) => (
                                <TableRow key={index}>
                                    <TableCell className="px-2 sm:px-3 text-xs sm:text-sm">{index + 1}</TableCell>
                                    <TableCell className="px-2 sm:px-3 text-xs sm:text-sm max-w-[100px] sm:max-w-none truncate">{data.sub_mogou_title}</TableCell>
                                    <TableCell className="px-2 sm:px-3 text-xs sm:text-sm max-w-[80px] sm:max-w-none truncate">{data.mogou_title}</TableCell>
                                    <TableCell className="px-2 sm:px-3 text-xs sm:text-sm">{data.today_views}</TableCell>
                                    <TableCell className="px-2 sm:px-3 text-xs sm:text-sm">{data.total_views}</TableCell>
                                </TableRow>
                            ))
                        }
                </TableBody>
                </Table>
            </div>
        </CardContent>
    </Card>
  )
}

export default ContentViewRank
