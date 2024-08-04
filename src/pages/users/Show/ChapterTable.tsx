import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa6";


type Chapter = {
    id:number,
    title:string,
    chapter_number:number,
    created_at:string
}

interface ChapterTableProps {
    chapterCollection: Chapter[];
}

export const ChapterTable = ({
    chapterCollection = [],
}: ChapterTableProps) => {

    const [chapters, setChapter] = useState<Chapter[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [showAll, setShowAll] = useState<boolean>(false);

    useEffect(() => {
        setChapter(chapterCollection);
    }, [chapterCollection,setChapter])


    const showAllChapters = () => {
        setLoading(true);

        setTimeout(() => {
            setChapter((prev: any) => [...chapterCollection, ...chapterCollection, ...chapterCollection, ...chapterCollection, ...chapterCollection, ...chapterCollection]);
            setLoading(false);
            setShowAll(true);
        },2000)

    }


    return (
        <>
            <Card x-chunk="dashboard-07-chunk-1">
                <CardHeader>
                    <CardTitle>Chapters</CardTitle>
                    <CardDescription>
                        Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table
                        divClassname="max-h-96 overflow-y-auto "
                        className=" w-full">

                        <TableBody className="gap-10 w-full">
                            {
                                chapters.map((mogou, index) => (
                                    <TableRow key={index} className="md:text-lg h-12">
                                        <TableCell key={index} className="text-sm ">
                                            Chapter {mogou.chapter_number} : {mogou.title.substring(0, 10)}...
                                        </TableCell>
                                        <TableCell
                                            className="text-right text-sm "
                                        >
                                            {
                                                mogou.created_at
                                            }
                                        </TableCell>
                                    </TableRow>

                                ))
                            }

                        </TableBody>
                    </Table>
                </CardContent>
                {!showAll &&  <CardFooter className="justify-center border-t p-4">
                   <Button size="sm" variant="ghost" className="gap-1 border-2 border-default"

                        onClick={showAllChapters}
                    >
                        {
                            loading ? (
                                <FaSpinner
                                    className="animate-spin "
                                />
                            ) : (
                                <>
                                    <  PlusCircle className="h-3.5 w-3.5"

                                    />
                                    Show All Chapters
                                </>

                            )
                        }
                    </Button>
                </CardFooter>}
            </Card></>
    )
}
