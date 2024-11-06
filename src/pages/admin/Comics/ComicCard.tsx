import { LazyLoadImage } from "react-lazy-load-image-component"
import { MogouWithTotalCount } from "./type"
import placeholder from '@/assets/imgs/place-holder/card_ph.png'


import { CalendarIcon, EyeIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { FaDiscord, FaTelegram } from "react-icons/fa6"
import { cn } from "@/utilities/util"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

type ComicTableProps = {
    mogous: MogouWithTotalCount
}

const ComicCard = ({ mogous }: ComicTableProps) => {

    const navigate = useNavigate();

    return (
        <div
            className=
                "bg-popover h-64 shadow flex shadow-neon-primary relative cursor-pointer group transition-all hover:-translate-y-3 rounded-md hover:-translate-x-1   hover:shadow-md hover:shadow-neon-primary ">
            <div className="lg:w-1/4">
                <LazyLoadImage
                    src={mogous.cover}
                    alt={mogous.title}
                    placeholderSrc={placeholder}
                    className="w-full h-64 object-cover   rounded-l-md  "
                />
            </div>
            <div className=" lg:w-3/4 p-4 flex flex-col gap-4 ">
                <div className="flex justify-between items-start gap-3">
                    <h3 className="text-lg font-semibold">{mogous.title}</h3>
                    <p className="text-sm text-muted-foreground flex items-center pt-1">
                        <EyeIcon className="h-4 w-4 inline-block mr-2 " />
                        <div className="font-bold">
                            {mogous.total_view_count}
                        </div>
                    </p>

                </div>


                <div className="flex gap-3">
                    <Badge className="w-fit self-start " variant="destructive">
                        Total Chapters: {mogous?.total_chapters ?? 0}
                    </Badge>

                    <Badge className="w-fit self-start " variant="default">
                        {mogous.mogou_type_name}
                    </Badge>
                  
                    <Badge className="w-fit self-start " variant="default">
                        {mogous.finish_status_name}
                    </Badge>
                </div>

                <div className="text-sm text-muted-foreground w-[90%] h-28">
                   
                    {
                        mogous.description.length > 120 ? mogous.description.slice(0, 120) + "..." : mogous.description
                    }
                </div>


                {/* button with chapters and Edit */}
                <div className="flex  items-center gap-4">
                    <Button
                        size={"sm"}

                        onClick={() => navigate(`/admin/mogou/${mogous.slug}/chapters`)}
                        className=" px-4 py-2 rounded-md hover:bg-accent"
                    >
                        Chapters
                    </Button>
                    <Button
                        size={"sm"}
                        onClick={() => navigate(`/admin/mogou/edit/${mogous.slug}`)}
                        className=" px-4 py-2 rounded-md hover:bg-accent"
                    >
                        Edit
                    </Button>
                </div>

            </div>


            <div className="absolute top-16 right-3">
                <div className="flex flex-col gap-4">
                    <FaTelegram className="text-blue-800 text-2xl" />
                    <FaDiscord className="text-gray-300 text-2xl" />
                </div>
            </div>

            <div className="absolute bottom-4 right-3">
                <div
                    className={cn(
                        "pl-3 text-left flex items-center text-xs font-normal",
                        "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                    {mogous.created_at}
                </div>
            </div>

        </div>
    );
};

export default ComicCard