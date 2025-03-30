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


import { Flame, Lock, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { MogouChapter } from "@/pages/admin/Comics/type";
import useQuery from "@/hooks/useQuery";
import { useUserAppSelector } from "@/redux/hooks";
import { selectAuthUser } from "@/redux/slices/user-global";
import { isSubscriptionValid } from "@/utilities/util";
import { useNavigate } from "react-router-dom";

interface ChapterTableProps {
    mogous: any;
}

export const ChapterTable = ({
    mogous
}: ChapterTableProps) => {
    const [chapters, setChapters] = useState<MogouChapter[]>([]);
    const [userCanReadAll, setUserCanReadAll] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [showAll, setShowAll] = useState<boolean>(false);
    const authUser = useUserAppSelector(selectAuthUser);
    const navigate = useNavigate();

    const callback = (data: any) => {
        if (data) {
            setChapters(data?.chapters);
            setLoading(false);
        }
    }

    useQuery(`users/mogous/${mogous.mogou.slug}/getMoreChapters`, callback, true, !showAll);

    useEffect(() => {
        setChapters(mogous.chapters);
    }, [mogous])

    useEffect(() => {
        if (authUser?.subscription_end_date && isSubscriptionValid(authUser?.subscription_end_date)) {
            setUserCanReadAll(true);
        }
        else {
            setUserCanReadAll(false);
        }
    }
        , [authUser])

    const showAllChapters = () => {
        setLoading(true);
        setShowAll(true);
    }


    const readTheChapter = (chapter: MogouChapter) => {
        const link = `/read/mogou/${mogous.mogou.slug}/chapters/${chapter.slug}`;
        if (userCanReadAll) {
            navigate(link);
        } else {
            //    if( chapter.third_party_redirect && !chapter.subscription_only){
            // add target
            navigate(link);

            //    }
        }
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
                        // duration 2s
                        divClassname="md:max-h-[70vh] overflow-y-auto transition ease-in-out"
                        className=" w-full">

                        <TableBody className="gap-10 w-full">
                            {
                                chapters?.map((chapter, index) => (
                                    <TableRow key={index}
                                        onClick={() => readTheChapter(chapter)}
                                        className={`md:text-lg h-12 ${chapterRowEffectClasses(chapter?.subscription_only, userCanReadAll)}
                                        
                                     `}>

                                        <TableCell key={index} className="text-sm ">
                                            Chapter {chapter.chapter_number} : {chapter.title.length > 60 ? chapter.title.slice(0, 60) + "..." : chapter.title}
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
                </CardContent>
                {(!showAll && chapters.length > 10) && <CardFooter className="justify-center border-t p-4">
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
const isNeedSubscriptionChapter = (isSubscriptionNeed, isValid) => {
    const isTrue = isSubscriptionNeed && !isValid;
    return isTrue ? (
        <div className="inline-flex items-center px-2 py-0 rounded-full text-[.7rem] font-semibold ms-5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg transition-all duration-300 ease-in-out hover:from-yellow-600 hover:to-yellow-700 hover:shadow-xl hover:scale-105">
            <Lock className="w-3 h-3 mr-1" />
            Subscription Needed
        </div>
    ) : null;
}



const chapterRowEffectClasses = (isSubscriptionNeed, isValid) => {
    return (!isSubscriptionNeed || isValid) ?
        "cursor-pointer hover:!bg-primary hover:text-white"
        : "cursor-not-allowed text-muted-foreground"
}
