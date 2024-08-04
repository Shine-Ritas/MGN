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
import { MogousType } from "./type"
import ComicTableRow from "./ComicTableRow"

const ComicTable = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [queryParameters] = useSearchParams();
    const [search] = useState<string>(queryParameters.get('search') ?? "");

    const { data, isLoading, isFetching } = useQuery(`admin/mogous?page=${currentPage}&search=${search}`);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Manga & Manhwas</CardTitle>
                <CardDescription>
                    Manage your manga and manhwas here.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="min-w-32 md:w-[100px] sm:table-cell">
                                <span className="">Cover</span>
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="hidden md:table-cell">Total Chapters</TableHead>
                            <TableHead className="hidden md:table-cell">
                                Total Views
                            </TableHead>
                            <TableHead className="hidden md:table-cell">Created at</TableHead>
                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            isLoading ? (<ContentTableRow />)
                                :
                                (
                                    data.mogous.data.length === 0 ? <ContentTableRow content="No data Found" /> :
                                        data.mogous.data.map((sub: MogousType) => {
                                            return <ComicTableRow key={sub.id} mogous={sub} />
                                        })
                                )
                        }

                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>

            {
                    (data && data.mogous.data.length > 0 ) && <TablePagination url={data.mogous.path} lastPage={data.mogous.last_page} currentPage={currentPage} setCurrentPage={setCurrentPage} isFetching={isFetching} />
            }
            </CardFooter>
        </Card>
    )
}

export default ComicTable