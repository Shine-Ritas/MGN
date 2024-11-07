import {  MogouWithTotalCount } from "@/pages/admin/Comics/type"

import { FaCaretRight } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import BookMark from "@/components/ui/bookmark";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Rating } from "@/components/ui/rating";
import { useUserAppSelector } from "@/redux/hooks";
import { selectAuthUser } from "@/redux/slices/user-global";
import { EyeIcon } from "lucide-react";

interface HeadingSectionProps {
    mogou: MogouWithTotalCount,
    isFavorite: boolean,
}

const HeadingSection = ({ mogou, isFavorite }: HeadingSectionProps) => {

    const auth = useUserAppSelector(selectAuthUser);

    return (
        <>
            <Card className="py-3 border-none outline-none shadow-none bg-background lg:bg-sub-background">
                <CardContent className="grid md:grid-cols-5 mx-0 px-0 gap-10 xl:gap-4 ">
                    <div className="flex justify-center md:justify-normal md:col-span-2 xl:col-span-1">
                        <LazyLoadImage src={mogou?.cover}
                            className="h-96 xl:h-80 object-cover"
                            alt={mogou?.title}
                        />

                    </div>
                    <div className="text-center md:text-start col-span-full md:col-span-3 xl:col-span-3 flex flex-col gap-3 md:gap-4">
                        <span className="text-xl md:text-3xl text-neon-primary font-semibold tracking-widest">
                            {mogou?.finish_status_name}
                        </span>
                        <Label className="text-lg md:text-4xl font-semibold">{mogou?.title}</Label>
                        <div className="flex gap-4 text-3xl justify-between lg:justify-start">
                            <Button
                                className="bg-neon-primary text-white  py-6 text-lg px-8 flex items-center w-full lg:w-fit">
                                Start Reading <FaCaretRight className="text-2xl" />
                            </Button>

                            <BookMark
                                mogou_id={mogou?.id}
                                user_id={auth?.id}
                                isDisabled={auth == null}
                                isBookMarked={isFavorite} className=" py-6 text-lg" />
                        </div>
                        <div className="flex gap-4 justify-center md:justify-start">
                            <span className="text-muted-foreground">Manga</span>
                            <span className="text-muted-foreground">
                                <EyeIcon className="h-4 w-4 inline-block mr-2 " />
                                {
                                    mogou?.total_view_count
                                }
                            </span>
                        </div>
                        <div className="flex">
                            <span className="text-muted-foreground">
                                <div dangerouslySetInnerHTML={{ __html: mogou?.description }} />
                            </span>
                        </div>
                    </div>
                    <div className="col-span-full xl:col-span-1 flex flex-wrap xl:flex-col gap-4 xl:justify-start justify-between ">
                        <div className="flex flex-col gap-1">
                            <p className="text-md">
                                <span className="text-muted-foreground">Author :</span> <span className="text-sm">{mogou?.author}</span>
                            </p>
                            <p className="text-md">
                                <span className="text-muted-foreground">Published At :</span> <span className="text-sm">{mogou?.released_at}</span>
                            </p>
                            <p className="text-md">
                                <span className="text-muted-foreground">Genres :</span> <span className="text-sm">{
                                    mogou?.categories.map((category) => {
                                        return category.title
                                    }).join(", ")
                                }</span>
                            </p>
                        </div>
                        <Card className="bg-secondary mt-4 w-full min-h-20 flex items-center">
                            <CardContent className="flex gap-4 items-center  md:h-20 px-6 py-0">
                                <div className="w-1/3 text-xl whitespace-nowrap">
                                    {mogou?.rating} / 5
                                </div>
                                <div className="w-2/3 flex justify-start">
                                    <Rating rating={mogou?.rating} size={20} variant="default" disabled={true} />
                                </div>

                            </CardContent>
                        </Card>
                    </div>
                </CardContent>

            </Card>
        </>
    )
}

export default HeadingSection