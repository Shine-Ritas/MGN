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
import useMutate from '@/hooks/useMutate'

type ReportStaus = 'Open' | 'Resolved' | 'In Progress';
type ReportStatus = 0 | 1 | 2;

const statusMap: Record<ReportStaus, ReportStatus> = {
  'Open': 0,
  'In Progress': 2,
  'Resolved': 1
}

const initialState = {
  order_by: "desc",
  search: "",
  status: "",
  page: 1,
}

export default function ReportPage() {
  const [selectedReport, setSelectedReport] = useState<any | null>(null)

  const { bunUrl, handleChange: handleFilter, getByKey } = useFilterState(initialState, ['page']);
  const { data, isFetching,refetch } = useQuery(`/admin/reports?${bunUrl}&limit=9`, () => { }, true);

  const onSuccess = () => {
    refetch!()
  }


  const [mutate, { isLoading: isMutating }] = useMutate({ callback: onSuccess, navigateBack: false });

  const handleStatusChange = async (reportId: string, newStatus: ReportStaus) => {
    console.log('reportId', reportId, 'newStatus', newStatus)
    await mutate(`/admin/reports/${reportId}`, { status: statusMap[newStatus] })
  }

  return (
    <div className="pe-4 space-y-8">
      <Card>
        <CardHeader className='w-full flex flex-row justify-between'>
          <div className="w-full flex flex-col gap-2">
            <CardTitle>Submitted Reports</CardTitle>
            <CardDescription>View and manage user-submitted reports</CardDescription>
          </div>
          <div className="w-full flex gap-3">
            <ReportFilter getByKey={getByKey} handleFilter={handleFilter} total={data?.reports?.total} />
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
            )}
          </div>
        </CardHeader>

        <CardContent>
          <Dialog>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {data?.reports?.data.map((report) => (
                <div key={report.id} className="mb-4 p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={report.avatar} alt={report.user_id} />
                        <AvatarFallback>{report.title[0]}</AvatarFallback>
                      </Avatar>
                      <span className="font-semibold">{report.user}</span>
                    </div>
                    <Badge
                      variant={report.status === 'Open' ? 'destructive' : report.status === 'In Progress' ? 'default' : 'secondary'}
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
                      <Button variant="outline" size="sm" disabled={isMutating} onClick={() => handleStatusChange(report.id, 'Open')}>Open</Button>
                      <Button variant="outline" size="sm" disabled={isMutating} onClick={() => handleStatusChange(report.id, 'In Progress')}>In Progress</Button>
                      <Button variant="outline" size="sm" disabled={isMutating} onClick={() => handleStatusChange(report.id, 'Resolved')}>Resolved</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedReport && (
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
            )}
          </Dialog>
        </CardContent>
      </Card>
    </div>
  )
}
