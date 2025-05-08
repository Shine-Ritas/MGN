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
import { Link, useParams } from "react-router-dom";
import { usePublishContent } from "@/contexts/PublishContentContext";
import { useCallback } from "react";
import { PublishDataType } from "../Comics/ComicTable";
import { FaTelegram } from "react-icons/fa6";


type Chapter = {
    id: number,
    title: string,
    slug: string,
    chapter_number: number,
    total_images: number,
    created_at: string,
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

    const { slug: mogou_slug } = useParams<{ slug: string }>();

    const { setPublishData } = usePublishContent();

    const handlePublishClick = useCallback((slug: string) => {
        setPublishData((prev: PublishDataType) => ({
            ...prev,
            open: true,
            mogou_slug: mogou_slug,
            sub_mogou_slug: slug,
        }))
    }
        , [mogou_slug, setPublishData])

    return (
        <>
            <Card x-chunk="dashboard-07-chunk-1 " className="bg-background border-none">

                <CardContent className="px-0">
                    <Table
                        divClassname=" overflow-y-auto pt-0 "
                        className=" w-full border  bg-">

                        <TableHeader>
                            <TableRow>
                                <TableHead className={cn(tableStyleClasses.tableHeader, "ps-3")}>Name</TableHead>
                                <TableHead className={cn(tableStyleClasses.tableHeader, "text-center")}>Chapter Number</TableHead>
                                <TableHead className={cn(tableStyleClasses.tableHeader, "text-center")}>Created At</TableHead>
                                <TableHead className={cn(tableStyleClasses.tableHeader, "")}></TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody className="gap-10 w-full ">
                            {
                                chapterCollection?.map((chapter, index) => (
                                    <TableRow key={index} className="md:text-lg h-12 ">

                                        <TableCell key={index} className="text-sm border ps-3">
                                            {
                                                chapter.title.length > 60 ? chapter.title.substring(0, 60) + "..." : chapter.title
                                            }
                                        </TableCell>

                                        <TableCell
                                            className="text-sm text-center border">
                                            {
                                                chapter.chapter_number
                                            }
                                        </TableCell>
                                        <TableCell
                                            className="text-center text-sm  border">
                                            {
                                                chapter.created_at
                                            }
                                        </TableCell>

                                        <TableCell className="text-center w-32 flex gap-2 items-center">

                                            {/* acrtion with eye icon */}
                                            <Link to={`/admin/mogou/${mogou_slug}/chapters/edit/${chapter.id}`}>
                                                <Button size="sm"
                                                    variant="ghost"
                                                    className="gap-1 border-2 border-default">
                                                    <PlusCircle className="h-3.5 w-3.5" />
                                                    View
                                                </Button>

                                            </Link>
                                            <Button size="sm"
                                                className="gap-1 border-2 border-default"
                                                onClick={() => handlePublishClick(chapter.slug)}
                                            >
                                                <FaTelegram className="h-3.5 w-3.5" />
                                                Telegram
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
