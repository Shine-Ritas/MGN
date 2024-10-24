import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { UserLoginHistoryType } from './UserDetail'


const UserLoginHistroy = ({ loginHistory,setCurrentTable } : {loginHistory : UserLoginHistoryType[],setCurrentTable : any}) => {
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
          <TableHeader className='min-w-full overflow-hidden'>
            <TableRow>
              <TableHead className='w-1/5'>Location</TableHead>
              <TableHead className='w-1/5'>Country</TableHead>
              <TableHead className='w-1/5'>Device</TableHead>
              <TableHead className='w-1/5'>Date</TableHead>
            </TableRow>
          </TableHeader>
        </Table>

        <div className="overflow-y-auto">
          <Table divClassname='max-h-72'>
            <TableBody className='overscroll-y-scroll '>
              {loginHistory.map((login, index) => (
                <TableRow key={index} className='overflow-hidden'>
                  <TableCell className='w-1/5'>{login.location}</TableCell>
                  <TableCell className='w-1/5'>{login.country}</TableCell>
                  <TableCell className='w-1/5'>{login.device}</TableCell>
                  <TableCell className='w-1/5'>{login.login_at}</TableCell>
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