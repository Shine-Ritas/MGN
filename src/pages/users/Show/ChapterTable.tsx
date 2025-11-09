import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Skeleton } from "@/components/ui/skeleton"

import { Flame, Lock, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { MogouChapter } from "@/pages/admin/Comics/type";
import useQuery from "@/hooks/useQuery";
import { useScreenDetector } from "@/hooks/useScreenDetector";
import useReadChapter from "@/hooks/useReadChapter";

interface ChapterTableProps {
    mogous: any;
}

export const ChapterTable = ({
    mogous,
}: ChapterTableProps) => {
    const [chapters, setChapters] = useState<MogouChapter[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [showAll, setShowAll] = useState<boolean>(false);
    const {isMobile} = useScreenDetector();

    const { readTheChapter, userCanReadAll } = useReadChapter();


    const callback = (data: any) => {
        if (data && data?.chapters) {
            setChapters(prevChapters => {
                // If we already have chapters, check if the new data is actually different
                if (prevChapters.length > 0) {
                    // If lengths are different, definitely update
                    if (data.chapters.length !== prevChapters.length) {
                        return data.chapters;
                    }
                    // If lengths are the same, check if content is different
                    // Compare by chapter_number to avoid unnecessary rerenders
                    const isDifferent = prevChapters.some((chapter, idx) => 
                        chapter.chapter_number !== data.chapters[idx]?.chapter_number
                    );
                    // Only update if content is actually different
                    return isDifferent ? data.chapters : prevChapters;
                }
                // No previous chapters, always update
                return data.chapters;
            });
            setLoading(false);
        }
    }

    useQuery(`users/mogous/${mogous?.mogou?.slug}/getMoreChapters`, callback, true, !showAll || !mogous?.mogou?.slug);

    useEffect(() => {
        if (mogous?.chapters) {
            setChapters(mogous.chapters);
        }
    }, [mogous])


    const showAllChapters = () => {
        // Only show loading if we don't have chapters yet
        if (chapters.length === 0) {
            setLoading(true);
        }
        setShowAll(true);
    }

    // Show loading skeleton if mogous is not available
    if (!mogous) {
        return (
            <Card x-chunk="dashboard-07-chunk-1">
                <CardHeader>
                    <CardTitle>All Chapters</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="flex items-center justify-between h-12 px-4">
                                <Skeleton className="h-4 w-48" />
                                <Skeleton className="h-4 w-20" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <>
            <Card x-chunk="dashboard-07-chunk-1">
                <CardHeader>
                    <CardTitle>All Chapters</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="space-y-3">
                            {Array.from({ length: 10 }).map((_, index) => (
                                <div key={`loading-${index}`} className="flex items-center justify-between h-12 px-4">
                                    <Skeleton className="h-4 w-48" />
                                    <Skeleton className="h-4 w-20" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <Table
                            // duration 2s
                            divClassname="max-h-[70vh] overflow-y-auto transition ease-in-out"
                            className=" w-full">

                            <TableBody className="gap-10 w-full">
                                {
                                    chapters?.map((chapter, index) => (
                                        <TableRow key={chapter.id || chapter.chapter_number || index}
                                            onClick={() => readTheChapter(chapter,mogous)}
                                            className={`text-lg h-12 flex items-center justify-between ${chapterRowEffectClasses(chapter?.subscription_only, userCanReadAll)}
                                            
                                         `}>

                                            <TableCell className="curor-pointer text-sm   flex items-center gap-2">
                                                Chapter {chapter.chapter_number}  { !isMobile &&  (chapter.title.length > 60 ? ": " + chapter.title.slice(0, 60) + "..." : ": " + chapter.title)}
                                                {
                                                    isNewChapter(chapter.created_at)
                                                }
                                                {
                                                    isNeedSubscriptionChapter(chapter?.subscription_only, userCanReadAll)
                                                }
                                            </TableCell>
                                            <TableCell
                                                className="text-right text-sm "
                                            >
                                                {
                                                    chapter.created_at
                                                }

                                            </TableCell>

                                        </TableRow>

                                    ))
                                }

                            </TableBody>
                        </Table>
                    )}
                </CardContent>
                {(!showAll && chapters.length > 9) && <CardFooter className="justify-center border-t p-4">
                    <Button size="sm" variant="ghost" className="gap-1 border-2 border-default"
                        aria-label="Show All Chapters"
                        onClick={showAllChapters}>
                        {
                            loading ? (
                                <FaSpinner className="animate-spin " />
                            ) : (
                                <><PlusCircle className="h-3.5 w-3.5" />Show All Chapters</>
                            )
                        }
                    </Button>
                </CardFooter>}
            </Card></>
    )
}

const isNewChapter = (date: string | number | Date) => {
    const isNew = new Date(date) >= new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);

    if (isNew) {
        return (
            <div className="inline-flex items-center px-2 py-0 rounded-full text-[.7rem] font-semibold ms-5 bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg transition-all duration-300 ease-in-out hover:from-red-600 hover:to-orange-600 hover:shadow-xl hover:scale-105">
                <Flame className="w-3 h-3 mr-1" />
                New
            </div>
        );
    }
    return null;
}

// return icon with unlock
const isNeedSubscriptionChapter = (isSubscriptionNeed : boolean, isValid : boolean) => {
    const isTrue = isSubscriptionNeed && !isValid;
    return isTrue ? (
        <div className="inline-flex items-center px-2 py-0 rounded-full text-[.7rem] font-semibold ms-5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg transition-all duration-300 ease-in-out hover:from-yellow-600 hover:to-yellow-700 hover:shadow-xl hover:scale-105">
            <Lock className="w-3 h-3 mr-1" />
            Subscription Needed
        </div>
    ) : null;
}



const chapterRowEffectClasses = (isSubscriptionNeed : boolean, isValid : boolean) => {
    return (!isSubscriptionNeed || isValid) ?
        "cursor-pointer hover:!bg-primary hover:text-white"
        : "cursor-not-allowed text-muted-foreground"
}
