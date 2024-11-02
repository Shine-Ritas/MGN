import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { UserSubscriptionHistoryType } from './UserDetail'

type UserSubscriptionHistoryProps = {
    history: UserSubscriptionHistoryType[],
    setCurrentTable: any
}

const UserSubscriptionHistory = ({ history ,setCurrentTable } : UserSubscriptionHistoryProps) => {

    return (
        <Card className="col-span-2 md:col-span-1 min-h-full">
            <CardHeader className='relative'>
                <CardTitle>Subscription History</CardTitle>
                <CardDescription>Recent Subscribed Packages</CardDescription>

                {
                    setCurrentTable && <Button
                    onClick={() => setCurrentTable('login')}
                    className='absolute right-5 top-3 text-xs' size="sm">Login History</Button>
                }
                

            </CardHeader>
            <CardContent>
                <Table >
                    <TableHeader className='min-w-full'>
                        <TableRow>
                            <TableHead className='w-1/6'></TableHead>
                            <TableHead className='w-2/6'>Subscription Name</TableHead>
                            <TableHead  className='w-2/6'>Subscription Price</TableHead>
                            <TableHead >Date</TableHead>
                        </TableRow>
                    </TableHeader>
                </Table>

                <div className="overflow-y-auto">
                    <Table divClassname='max-h-72'>
                        <TableBody className='overscroll-y-scroll ' >
                            {history?.map((histroy,index) => (
                                <TableRow key={Math.random() * 1000} >
                                    <TableCell className='w-1/6 indent-6' >{index + 1}</TableCell>
                                    <TableCell className='w-2/6' >{histroy.title}</TableCell>
                                    <TableCell className='w-2/6' >{histroy.price}</TableCell>
                                    <TableCell  className='w-3/12'>{histroy.created_at}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}

export default UserSubscriptionHistory