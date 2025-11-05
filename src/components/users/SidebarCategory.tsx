import { ComicType } from "@/data/data";
import { ComicCategory } from "@/pages/admin/Category/type";
import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface SidebarAccordionsType {
    collection : ComicCategory[]| ComicType[],
    type?: string,
    linkWrapper?: (link: ReactNode, category: ComicCategory | ComicType) => ReactNode
}

const SidebarAccordions = ({
    collection,
    type,
    linkWrapper
}:SidebarAccordionsType) => {

    return (
        <ul className="flex flex-col gap-4 text-muted-foreground ps-4">
        {
            collection?.map((category) => {
                const link = (
                    <Link 
                        to={`/filter?${type}=${category.title}`}
                        title={category.title} 
                        className="hover:text-foreground" >
                        <span>{category?.title}</span>
                    </Link>
                );
                return linkWrapper ? linkWrapper(link, category) : <div key={category.id}>{link}</div>;
            })
        }
    </ul>
    )
}

export default SidebarAccordions