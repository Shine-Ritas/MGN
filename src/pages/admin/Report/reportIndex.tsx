'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from '@radix-ui/react-scroll-area'


type Report = {
  id: string
  user: string
  avatar: string
  issue: string
  description: string
  status: 'open' | 'in progress' | 'resolved'
  date: string
  pageUrl: string
  imageUrl?: string
}

const mockReports: Report[] = [
  { id: '1', user: 'Alice', avatar: '/placeholder.svg?height=40&width=40', issue: 'App crashes on startup', description: 'When I try to open the app, it immediately crashes.', status: 'open', date: '2023-09-15', pageUrl: 'https://example.com/home' },
  { id: '2', user: 'Bob', avatar: '/placeholder.svg?height=40&width=40', issue: 'Cannot upload images', description: 'The upload button is not responding when I try to add a new image.', status: 'in progress', date: '2023-09-14', pageUrl: 'https://example.com/upload', imageUrl: '/placeholder.svg?height=200&width=300' },
  { id: '3', user: 'Charlie', avatar: '/placeholder.svg?height=40&width=40', issue: 'Login button not working', description: 'Clicking on the login button does nothing.', status: 'resolved', date: '2023-09-13', pageUrl: 'https://example.com/login' },
]

export default function ReportPage() {
  const [reports, setReports] = useState<Report[]>(mockReports)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)


  const handleStatusChange = (reportId: string, newStatus: 'open' | 'in progress' | 'resolved') => {
    setReports(prevReports => 
      prevReports.map(report => 
        report.id === reportId ? { ...report, status: newStatus } : report
      )
    )
  }

  return (
    <div className=" pe-4 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Submitted Reports</CardTitle>
          <CardDescription>View and manage user-submitted reports</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] w-full pr-4">
            {reports.map((report) => (
              <div key={report.id} className="mb-4 p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={report.avatar} alt={report.user} />
                      <AvatarFallback>{report.user[0]}</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold">{report.user}</span>
                  </div>
                  <Badge 
                    variant={report.status === 'open' ? 'destructive' : report.status === 'in progress' ? 'default' : 'secondary'}
                  >
                    {report.status}
                  </Badge>
                </div>
                <p className="text-sm font-medium mb-2">{report.issue}</p>
                <p className="text-xs text-muted-foreground mb-2">{report.date}</p>
                <div className="flex justify-between items-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedReport(report)}>View Details</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{selectedReport?.issue}</DialogTitle>
                        <DialogDescription>Reported by {selectedReport?.user} on {selectedReport?.date}</DialogDescription>
                      </DialogHeader>
                      <div className="mt-4">
                        <p className="text-sm mb-2">{selectedReport?.description}</p>
                        <p className="text-xs text-muted-foreground mb-2">Page URL: {selectedReport?.pageUrl}</p>
                        {selectedReport?.imageUrl && (
                          <div className="mt-4">
                            <img src={selectedReport.imageUrl} alt="Report Image" className="max-w-full h-auto rounded-lg" />
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleStatusChange(report.id, 'open')}>Open</Button>
                    <Button variant="outline" size="sm" onClick={() => handleStatusChange(report.id, 'in progress')}>In Progress</Button>
                    <Button variant="outline" size="sm" onClick={() => handleStatusChange(report.id, 'resolved')}>Resolved</Button>
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}