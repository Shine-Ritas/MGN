import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Card,
    CardContent,
} from "@/components/ui/card"


import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/utilities/util";


type Chapter = {
    id:number,
    title:string,
    chapter_number:number,
    total_images:number,
    created_at:string,
}

interface ChapterTableProps {
    chapterCollection: Chapter[];
}

const tableStyleClasses = {
    table: "w-full",
    tableHeader: "border",
    tableBody: "gap-10 w-full",
    tableRow: "md:text-lg h-12",
    tableCell: "text-sm",
}

export const ChapterTable = ({
    chapterCollection = [],
}: ChapterTableProps) => {
    return (
        <>
            <Card x-chunk="dashboard-07-chunk-1 " className="bg-background border-none">
               
                <CardContent className="px-0">
                    <Table
                        divClassname=" overflow-y-auto pt-0 "
                        className=" w-full border  bg-">

                        <TableHeader>
                            <TableRow>
                                <TableHead className={cn(tableStyleClasses.tableHeader,"ps-3")}>Name</TableHead>
                                <TableHead className={cn(tableStyleClasses.tableHeader,"text-center")}>Order</TableHead>
                                <TableHead className={cn(tableStyleClasses.tableHeader,"text-center")}>Created At</TableHead>
                                <TableHead className={cn(tableStyleClasses.tableHeader,"")}></TableHead>
                            </TableRow>
                        </TableHeader>  

                        <TableBody className="gap-10 w-full ">
                            {
                                chapterCollection?.map((mogou, index) => (
                                    <TableRow key={index} className="md:text-lg h-12 ">
                                       
                                        <TableCell key={index} className="text-sm border ps-3">
                                            {
                                                mogou.title.length > 60 ? mogou.title.substring(0, 60) + "..." : mogou.title
                                            }
                                        </TableCell>

                                        <TableCell
                                            className="text-sm text-center border">
                                            {
                                                mogou.chapter_number
                                            }
                                        </TableCell>
                                        <TableCell
                                            className="text-center text-sm  border">
                                            {
                                                mogou.created_at
                                            }
                                        </TableCell>

                                        <TableCell className="text-center w-32">

                                            {/* acrtion with eye icon */}
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="gap-1 border-2 border-default"
                                            >
                                                <PlusCircle className="h-3.5 w-3.5" />
                                                View
                                            </Button>

                                            
                                        </TableCell>
                                    </TableRow>

                                ))
                            }

                        </TableBody>
                    </Table>
                </CardContent>
            </Card></>
    )
}
