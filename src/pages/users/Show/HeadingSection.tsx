
import { FaCaretRight } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import BookMark from "@/components/ui/bookmark";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Rating } from "@/components/ui/rating";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserAppSelector } from "@/redux/hooks";
import { selectAuthUser } from "@/redux/slices/user-global";
import { EyeIcon } from "lucide-react";
import DOMPurify from 'dompurify';

import useReadChapter from "@/hooks/useReadChapter";
import CategoryBadge from "@/components/ui/mogou-card/category-badge";

interface HeadingSectionProps {
    mogous: any,
    loading: boolean | undefined
}

const HeadingSection = ({ mogous, loading }: HeadingSectionProps) => {

    const mogou = mogous?.mogou;
    const isFavorite = mogous?.is_favorite;

    const auth = useUserAppSelector(selectAuthUser);
    const { readTheChapter } = useReadChapter();

    // Shared CSS classes organized in an object to avoid duplication
    const sharedClasses = {
        card: "py-3 border-none outline-none shadow-none bg-background",
        cardContent: "grid md:grid-cols-8 mx-0 px-0 gap-10 xl:gap-4",

        cardContentSkeleton: "grid md:grid-cols-5 mx-0 px-0 gap-10 xl:gap-4",
        coverImageSkeleton: "flex justify-center md:justify-normal md:col-span-2 xl:col-span-1",
        sideInfoSkeleton: "col-span-full xl:col-span-1 flex flex-wrap xl:flex-col gap-4 xl:justify-start justify-between",

        mainContent: "text-center md:text-start col-span-full md:col-span-5 xl:col-span-4 flex flex-col gap-3 md:gap-4",
        coverImage: "flex justify-center md:justify-normal md:col-span-3 xl:col-span-2",
        sideInfo: "col-span-full xl:col-span-2 flex flex-wrap xl:flex-col gap-4 xl:justify-start justify-between",

        titleSection: "flex flex-col-reverse md:flex-col gap-3 md:gap-4",
        buttonSection: "flex gap-4 text-3xl justify-between lg:justify-start",
        metaInfo: "flex gap-4 justify-center md:justify-start",
        description: "flex",
        sideInfoDetails: "flex flex-col gap-1",
        sideInfoDetailsSkeleton: "flex flex-col gap-3",
        ratingCard: "bg-secondary mt-4 w-full min-h-20 flex items-center",
        ratingCardContent: "flex gap-4 items-center md:h-20 px-6 py-0"
    };


    if (loading || !mogous) {
        return (
            <Card className={sharedClasses.card}>
                <CardContent className={sharedClasses.cardContentSkeleton}>
                    {/* Cover Image Skeleton */}
                    <div className={sharedClasses.coverImageSkeleton}>
                        <Skeleton className="h-96 xl:h-80 w-64 rounded-sm" />
                    </div>
                    
                    {/* Main Content Skeleton */}
                    <div className={sharedClasses.mainContent}>
                        <div className={sharedClasses.titleSection}>
                            <Skeleton className="h-8 md:h-12 w-3/4 mx-auto md:mx-0" />
                        </div>
                        <div className={sharedClasses.buttonSection}>
                            <Skeleton className="h-12 w-full lg:w-48" />
                            <Skeleton className="h-12 w-12" />
                        </div>
                        <div className={sharedClasses.metaInfo}>
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                        <div className="flex max-h-28">
                            <div className="flex flex-col gap-2 w-full">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                                <Skeleton className="h-4 w-4/5" />
                                <Skeleton className="h-4 w-3/4" />
                            </div>
                        </div>
                    </div>
                    
                    {/* Side Info Skeleton */}
                    <div className={sharedClasses.sideInfoSkeleton}>
                        <div className={sharedClasses.sideInfoDetailsSkeleton}>
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-36" />
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-4 w-40" />
                        </div>
                        <Card className={sharedClasses.ratingCard}>
                            <CardContent className={sharedClasses.ratingCardContent}>
                                <Skeleton className="h-6 w-16" />
                                <Skeleton className="h-5 w-24" />
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <>
            <Card className={sharedClasses.card}>
                <CardContent className={sharedClasses.cardContent}>
                    <div className={sharedClasses.coverImage}>
                        <LazyLoadImage src={mogou?.cover}
                            className="h-96 xl:h-84 object-cover rounded-sm"
                            alt={`Cover image of ${mogou?.title}`} 
                        />
                    </div>
                    <div className={sharedClasses.mainContent}>
                        <div className={sharedClasses.titleSection}>
                            <span className="text-xl md:text-3xl text-neon-primary font-semibold tracking-widest hidden">
                                {mogou?.finish_status_name}
                            </span>
                            <Label
                            aria-label="Manga Title"
                            className="text-lg md:text-4xl font-semibold">{mogou?.title}</Label>
                        </div>
                        <div className={sharedClasses.buttonSection}>
                            <Button
                                aria-label="Start reading the manga"
                                className="bg-neon-primary text-white  py-6 text-lg px-8 flex items-center w-full lg:w-fit"
                                onClick={() => {
                                    readTheChapter(mogous?.chapters[0],mogous);
                                }}
                            >
                                Start Reading <FaCaretRight className="text-2xl hidden md:flex" />
                            </Button>

                            <BookMark
                                mogou_id={mogou?.id}
                                user_id={auth?.id}
                                isDisabled={auth == null}
                                isBookMarked={isFavorite} className=" py-6 text-lg" />
                        </div>
                        <div className={sharedClasses.metaInfo}>
                            <span className="text-muted-foreground">Manga</span>
                            <span className="text-muted-foreground">
                                <EyeIcon className="h-4 w-4 inline-block mr-2 " />
                                {
                                    mogou?.total_view_count
                                }
                            </span>
                        </div>
                        <div className={sharedClasses.description}>
                            <span className="text-muted-foreground max-h-40 md:max-h-48 overflow-y-auto">
                                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(mogou?.description) }} />
                            </span>
                        </div>
                    </div>
                    <div className={sharedClasses.sideInfo}>
                        <div className={sharedClasses.sideInfoDetails}>
                            <p className="text-md">
                                <span className="text-muted-foreground">Author :</span> <span className="text-sm">{mogou?.author}</span>
                            </p>
                            <p className="text-md">
                                <span className="text-muted-foreground">Published At :</span> <span className="text-sm">{mogou?.released_at}</span>
                            </p> 
                            <p className="text-md md:hidden">
                                <span className="text-muted-foreground">Status :</span> <span className="text-sm">{ mogou?.finish_status_name}</span>
                            </p>
                            <div className="text-md flex flex-wrap items-center gap-2">
                                <span className="text-muted-foreground">Genres :</span>
                                <div className="flex flex-wrap gap-2">
                                    {mogou?.categories.map((category: any, index: number) => (
                                        <CategoryBadge 
                                        onClick={() => window.location.href = `/filter?genres=${category.title}`}
                                        category={category} index={index} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <Card className={sharedClasses.ratingCard}>
                            <CardContent className={sharedClasses.ratingCardContent}>
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