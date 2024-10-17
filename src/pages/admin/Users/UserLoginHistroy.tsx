import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

type UserLoginHistoryType = {
  date: string
  time: string
  device: string
  location: string
}

const loginHistory: UserLoginHistoryType[] = [
  { date: "2023-05-01", time: "09:30 AM", device: "iPhone 12", location: "New York, USA" },
  { date: "2023-04-28", time: "02:15 PM", device: "MacBook Pro", location: "New York, USA" },
  { date: "2023-04-25", time: "11:45 AM", device: "Windows PC", location: "Boston, USA" },
  { date: "2023-05-01", time: "09:30 AM", device: "iPhone 12", location: "New York, USA" },
  { date: "2023-04-28", time: "02:15 PM", device: "MacBook Pro", location: "New York, USA" },
  { date: "2023-04-25", time: "11:45 AM", device: "Windows PC", location: "Boston, USA" },
  { date: "2023-04-25", time: "11:45 AM", device: "Windows PC", location: "Boston, USA" },
  { date: "2023-05-01", time: "09:30 AM", device: "iPhone 12", location: "New York, USA" },
  { date: "2023-04-28", time: "02:15 PM", device: "MacBook Pro", location: "New York, USA" },
  { date: "2023-04-25", time: "11:45 AM", device: "Windows PC", location: "Boston, USA" },
  { date: "2023-05-01", time: "09:30 AM", device: "iPhone 12", location: "New York, USA" },
  { date: "2023-04-28", time: "02:15 PM", device: "MacBook Pro", location: "New York, USA" },
]


const UserLoginHistroy = ({ setCurrentTable }) => {
  return (
    <Card className="col-span-2 md:col-span-1">
      <CardHeader className='relative'>

        <CardTitle>Login History</CardTitle>
        <CardDescription>Recent account access information</CardDescription>

        <Button
          onClick={() => setCurrentTable('subscription')}
          className='absolute right-5 top-3 text-xs' size="sm">Subscription History</Button>

      </CardHeader>
      <CardContent>
        <Table >
          <TableHeader className='min-w-full'>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Device</TableHead>
              <TableHead>Location</TableHead>
            </TableRow>
          </TableHeader>
        </Table>

        <div className="overflow-y-auto">
          <Table divClassname='max-h-72'>
            <TableBody className='overscroll-y-scroll'>
              {loginHistory.map((login, index) => (
                <TableRow key={index}>
                  <TableCell className='w-36'>{login.date}</TableCell>
                  <TableCell>{login.time}</TableCell>
                  <TableCell>{login.device}</TableCell>
                  <TableCell>{login.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

export default UserLoginHistroy