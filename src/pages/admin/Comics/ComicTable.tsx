import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { TablePagination } from "@/components/TablePagination"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import useQuery from "@/hooks/useQuery"
import ContentTableRow from "@/components/ui/custom/ContentTableRow"
import { MogousType } from "./type"

import ComicCard from "./ComicCard"

const ComicTable = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [queryParameters] = useSearchParams();
    const [search] = useState<string>(queryParameters.get('search') ?? "");

    const { data, isLoading, isFetching } = useQuery(`admin/mogous?page=${currentPage}&search=${search}&limit=10&mogou_total_count=true`);

    return (
        <Card className="pb-0 bg-background">
            <CardHeader>
                <CardTitle>
                    Your Comics
                </CardTitle>
                <CardDescription>
                    Manage All your Comics
                </CardDescription>
            </CardHeader>
            <CardContent className="">
                <div className="grid grid-cols-2 gap-x-8 gap-y-12">
                    {
                        isLoading ? (<ContentTableRow />)
                            :
                            (
                                data.mogous.data.length === 0 ? <ContentTableRow content="No data Found" /> :
                                    data.mogous.data.map((mogou: MogousType) => {
                                        return <ComicCard key={mogou.id} mogous={mogou} />
                                    })
                            )
                    }
                </div>
            </CardContent>
            <CardFooter className="bg-background flex items-center justify-center">

                {
                    (data && data.mogous.data.length > 0) && <TablePagination url={data.mogous.path} lastPage={data.mogous.last_page} currentPage={currentPage} setCurrentPage={setCurrentPage} isFetching={isFetching} />
                }
            </CardFooter>
        </Card>
    )
}

export default ComicTable