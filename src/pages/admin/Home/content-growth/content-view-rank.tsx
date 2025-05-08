import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Table, TableHeader,TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table"


const headers = ['#','Chapter Name','Title','Views (24h)','Views (1m)']

const ContentViewRank = ({chartData}) => {
  return (
    <Card className="w-full col-span-3 pt-3">
        <CardTitle className="indent-6 text-lg mb-3">
            This Week Popularity
        </CardTitle>
        <CardContent>
            <Table>
            <TableHeader>
                <TableRow >
                    {
                        headers.map((header, index) => (
                            <TableHead  key={index} className="indent-3">
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
                                <TableCell colSpan={5} className="text-center">
                                    No data available
                                </TableCell>
                            </TableRow>
                        ) : 
                        chartData?.map((data, index) => (
                            <TableRow key={index} className="indent-3">
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{data.sub_mogou_title}</TableCell>
                                <TableCell>{data.mogou_title}</TableCell>
                                <TableCell>{data.today_views}</TableCell>
                                <TableCell>{data.total_views}</TableCell>
                            </TableRow>
                        ))
                    }
            </TableBody>
            </Table>
        </CardContent>
    </Card>
  )
}

export default ContentViewRank
