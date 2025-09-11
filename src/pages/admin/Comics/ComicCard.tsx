import { LazyLoadImage } from "react-lazy-load-image-component"
import { MogouWithTotalCount } from "./type"
import placeholder from '@/assets/imgs/place-holder/card_ph.png'
import DOMPurify from 'dompurify';
import { CalendarIcon, EyeIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { FaTelegram } from "react-icons/fa6"
import { cn } from "@/utilities/util"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { PublishDataType } from "./ComicTable";
import { useCallback } from "react";
import { usePublishContent } from "@/contexts/PublishContentContext";

type ComicTableProps = {
    mogous: MogouWithTotalCount,
}

const ComicCard = ({ mogous}: ComicTableProps) => {

    const navigate = useNavigate();
    const { setPublishData } = usePublishContent();

    const handlePublishClick = useCallback(() => {
        setPublishData((prev: PublishDataType) => ({
            ...prev,
            open: true,
            mogou_slug: mogous.slug,
        }))
    }
    , [mogous.id, setPublishData])

    return (
        <div
            className=
                "bg-popover h-auto sm:h-64 shadow flex flex-col sm:flex-row shadow-neon-primary relative cursor-pointer group transition-all hover:-translate-y-3 rounded-md hover:-translate-x-1 hover:shadow-md hover:shadow-neon-primary pb-4 md:pb-0">
            <div className="w-full sm:w-1/4 flex justify-center">
                <LazyLoadImage
                    src={mogous.cover}
                    alt={mogous.title}
                    placeholderSrc={placeholder}
                    className="w-full h-48 sm:h-64 object-cover rounded-t-md sm:rounded-l-md sm:rounded-t-none"
                />
            </div>
            <div className="w-full sm:w-3/4 p-4 flex flex-col gap-3 sm:gap-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-3">
                    <h3 className="text-base sm:text-lg font-semibold line-clamp-2">{mogous.title}</h3>
                    <p className="text-sm text-muted-foreground flex items-center flex-shrink-0">
                        <EyeIcon className="h-4 w-4 inline-block mr-2" />
                        <div className="font-bold">
                            {mogous.total_view_count}
                        </div>
                    </p>
                </div>


                <div className="flex flex-wrap gap-2">
                    <Badge className="text-xs" variant="destructive">
                        Chapters: {mogous?.total_chapters ?? 0}
                    </Badge>

                    <Badge className="text-xs" variant="default">
                        {mogous.mogou_type_name}
                    </Badge>
                  
                    <Badge className="text-xs" variant="default">
                        {mogous.finish_status_name}
                    </Badge>
                </div>

                <div className="text-sm text-muted-foreground flex-1 min-h-0">
                    <div className="line-clamp-3" dangerouslySetInnerHTML={{ 
                        __html: DOMPurify.sanitize( 
                            mogous.description.length > (window.innerWidth < 640 ? 80 : 120) 
                                ? mogous.description.slice(0, window.innerWidth < 640 ? 80 : 120) + "..." 
                                : mogous.description
                        ) 
                    }} />
                </div>

                {/* button with chapters and Edit */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 mt-auto">
                    <Button
                        size={"sm"}
                        onClick={() => navigate(`/admin/mogou/${mogous.slug}/chapters`)}
                        className="px-4 py-2 rounded-md hover:bg-accent text-xs sm:text-sm"
                    >
                        Chapters
                    </Button>
                    <Button
                        size={"sm"}
                        onClick={() => navigate(`/admin/mogou/edit/${mogous.slug}`)}
                        className="px-4 py-2 rounded-md hover:bg-accent text-xs sm:text-sm"
                    >
                        Edit
                    </Button>
                </div>

            </div>


            <div className="absolute top-4 right-3 sm:top-16">
                <div className="flex flex-col gap-4">
                    <FaTelegram
                        onClick={handlePublishClick}
                        className="text-blue-800 text-xl sm:text-2xl hover:text-blue-500 cursor-pointer"
                    />
                </div>
            </div>

            <div className="absolute bottom-2 right-3 sm:bottom-4 ">
                <div
                    className={cn(
                        "text-left flex items-center text-xs font-normal",
                        "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 opacity-50" />
                    <span className="">{mogous.created_at || 'N/A'}</span>
                </div>
            </div>

        </div>
    );
};

export default ComicCard