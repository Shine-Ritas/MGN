import { ComicType } from "@/data/data";
import { ComicCategory } from "@/pages/admin/Category/type";
import { Link } from "react-router-dom";
interface SidebarAccordionsType {
    collection : ComicCategory[]| ComicType[],
    type?: string
}

const SidebarAccordions = ({
    collection,
    type
}:SidebarAccordionsType) => {

    return (
        <ul className="flex flex-col gap-4 text-muted-foreground ps-4">
        {
            collection?.map((category) => (
                <Link 
                    to={`/filter?${type}=${category.title}`}
                    key={category.id} title={category.title} className="hover:text-foreground" >
                    <span>{category?.title}</span>
                </Link>
            ))
        }
    </ul>
    )
}

export default SidebarAccordions