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
                <div className="overflow-x-auto">
                    <Table className="min-w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead className='min-w-[60px]'></TableHead>
                                <TableHead className='min-w-[180px]'>Subscription Name</TableHead>
                                <TableHead className='min-w-[140px]'>Subscription Price</TableHead>
                                <TableHead className='min-w-[120px]'>Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className='max-h-72 overflow-y-auto'>
                            {history?.map((histroy,index) => (
                                <TableRow key={Math.random() * 1000} >
                                    <TableCell className='min-w-[60px] text-center' >{index + 1}</TableCell>
                                    <TableCell className='min-w-[180px]' >{histroy.title}</TableCell>
                                    <TableCell className='min-w-[140px]' >{histroy.price}</TableCell>
                                    <TableCell className='min-w-[120px]'>{histroy.created_at}</TableCell>
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