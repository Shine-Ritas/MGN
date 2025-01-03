'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import useFilterState from '@/hooks/useFilterState'
import useQuery from '@/hooks/useQuery'
import ReportFilter from './report-filter'
import { TablePagination } from '@/components/TablePagination'


type ReportStaus = 'Open' | 'In Progress' | 'Resolved';


type Report = {
  id: string
  user: string
  avatar: string
  issue: string
  description: string
  status: ReportStaus
  date: string
  pageUrl: string
  imageUrl?: string
}

const mockReports: Report[] = [
  { id: '1', user: 'Alice', avatar: '/placeholder.svg?height=40&width=40', issue: 'App crashes on startup', description: 'When I try to open the app, it immediately crashes.', status: 'Open', date: '2023-09-15', pageUrl: 'https://example.com/home' },
  { id: '2', user: 'Bob', avatar: '/placeholder.svg?height=40&width=40', issue: 'Cannot upload images', description: 'The upload button is not responding when I try to add a new image.', status: 'In Progress', date: '2023-09-14', pageUrl: 'https://example.com/upload', imageUrl: '/placeholder.svg?height=200&width=300' },
  { id: '3', user: 'Charlie', avatar: '/placeholder.svg?height=40&width=40', issue: 'Login button not working', description: 'Clicking on the login button does nothing.', status: 'Resolved', date: '2023-09-13', pageUrl: 'https://example.com/login' },
]

const initialState = {
  order_by: "desc",
  search: "",
  status: "",
  page: 1,
}


export default function ReportPage() {
  const [reports, setReports] = useState<Report[]>(mockReports)
  const [selectedReport, setSelectedReport] = useState<any | null>(null)

  const { bunUrl, handleChange: handleFilter, getByKey } = useFilterState(initialState, ['page']);

  const { data, isLoading, isFetching } = useQuery(`/admin/reports?${bunUrl}&limit=9`, () => { }, true);

  const handleStatusChange = (reportId: string, newStatus: 'open' | 'in progress' | 'resolved') => {
    // setReports(prevReports => 
    //   prevReports.map(report => 
    //     report.id === reportId ? { ...report, status: newStatus } : report
    //   )
    // )
    console.log([reports,setReports,isLoading])
  }



  return (
    <div className=" pe-4 space-y-8">
      <Card>
        <CardHeader className='w-full flex flex-row justify-between '>
          <div className="w-full flex flex-col gap-2">
            <CardTitle>Submitted Reports</CardTitle>
            <CardDescription>View and manage user-submitted reports</CardDescription>
          </div>
          <div className="w-full flex gap-3">
          <ReportFilter getByKey={getByKey} handleFilter={handleFilter} total={data?.reports?.total} />
            <div className="">
              {data && data.reports.data.length > 0 && (
              <TablePagination
                url={data.reports.path}
                lastPage={data.reports.last_page}
                currentPage={getByKey("page")}
                setCurrentPage={(page) => handleFilter("page", page)}
                isFetching={isFetching}
                paging={false}
                hideLabel={true}
              />
            )}</div>
          </div>
        </CardHeader>
        <CardContent className=''>
          <Dialog>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

              {data?.reports?.data.map((report) => (
                <div key={report.id} className="mb-4 p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={report.avatar} alt={report.use_id} />
                        <AvatarFallback>{report.title[0]}</AvatarFallback>
                      </Avatar>
                      <span className="font-semibold">{report.user}</span>
                    </div>
                    <Badge
                      variant={report.status === 'Open' ? 'destructive' : report.status === 'In progress' ? 'default' : 'secondary'}
                    >
                      {report.status}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium mb-2">{report.title}</p>
                  <p className="text-xs text-muted-foreground mb-2">{report.created_at}</p>
                  <div className="flex justify-between items-center">
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedReport(report)}>View Details</Button>
                    </DialogTrigger>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleStatusChange(report.id, 'open')}>Open</Button>
                      <Button variant="outline" size="sm" onClick={() => handleStatusChange(report.id, 'in progress')}>In Progress</Button>
                      <Button variant="outline" size="sm" onClick={() => handleStatusChange(report.id, 'resolved')}>Resolved</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>{selectedReport?.title}</DialogTitle>
                <DialogDescription>Reported by {selectedReport?.user_id} on {selectedReport?.created_at}</DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <p className="text-sm mb-2">{selectedReport?.description}</p>
                <p className="text-xs text-muted-foreground mb-2">Page URL: {selectedReport?.current_url}</p>
                {selectedReport?.image && (
                  <div className="mt-4">
                    <img src={selectedReport.image} alt="Report Image" className="max-w-full h-auto rounded-lg" />
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>

      </Card>
    </div>
  )
}