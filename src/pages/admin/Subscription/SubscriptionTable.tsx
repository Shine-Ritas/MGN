import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { TablePagination } from "@/components/TablePagination"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import useQuery from "@/hooks/useQuery"
import ContentTableRow from "@/components/ui/custom/ContentTableRow"
import SubscriptionTableRow from "./SubscriptionTableRow"
import { SubscriptionType } from "./type"
const SubscriptionTable = ({ countBy, priceBy }: { countBy: string, priceBy: string }) => {

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [queryParameters] = useSearchParams();
    const [search] = useState<string>(queryParameters.get('search') ?? "");

    const { data, isLoading, isFetching } = useQuery(`admin/subscriptions?page=${currentPage}&search=${search}&count_by=${countBy}&price_by=${priceBy}`);

    return (
        <div className=" flex flex-col w-full min-h-full justify-between   gap-4">

            <div className="overflow-scroll min-h-5/6">
                <Table divClassname=" overscroll-y-scroll"
                
                className="">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="">
                                <span className="">Subscription Name</span>
                            </TableHead>
                            <TableHead>
                                Subscription Duration
                            </TableHead>

                            <TableHead>
                                Max Subscriptions Limit
                            </TableHead>

                            <TableHead>
                                Subscription Price
                            </TableHead>

                            <TableHead>
                                Total Subscriptions
                            </TableHead>

                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="">
                        {
                            isLoading ? (<ContentTableRow />)
                                :
                                (
                                    data.subscriptions.data.length === 0 ? <ContentTableRow content="No data Found" /> :
                                        data.subscriptions.data.map((sub: SubscriptionType) => {
                                            return <SubscriptionTableRow key={sub.id} index={sub.id as number} subscription={sub} />
                                        })
                                )
                        }

                    </TableBody>
                </Table>
            </div>
            <CardFooter className="h-1/6">
                {
                    (data && data.subscriptions.data.length > 0) && <TablePagination url={data.subscriptions.path} lastPage={data.subscriptions.last_page} currentPage={currentPage} setCurrentPage={setCurrentPage} isFetching={isFetching} />
                }
            </CardFooter>
        </div>
    )
}

export default SubscriptionTable