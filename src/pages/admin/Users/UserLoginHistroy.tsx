import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

type UserLoginHistoryType = {
    date: string
    time: string
    device: string
    location: string
}

const UserLoginHistroy = ({loginHistory} :{loginHistory:UserLoginHistoryType[]}) => {
  return (
    <Card className="col-span-2 md:col-span-1 h-full">
          <CardHeader>
            <CardTitle>Login History</CardTitle>
            <CardDescription>Recent account access information</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead>Location</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loginHistory.map((login, index) => (
                  <TableRow key={index}>
                    <TableCell>{login.date}</TableCell>
                    <TableCell>{login.time}</TableCell>
                    <TableCell>{login.device}</TableCell>
                    <TableCell>{login.location}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
  )
}

export default UserLoginHistroy