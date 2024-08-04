import { Label } from "../ui/label";
import { ComicCategory } from "@/pages/admin/Category/type";
import { ComicType } from "@/constants/constants";


interface SidebarAccordionsType {
    collection : ComicCategory[]| ComicType[]
}

const SidebarAccordions = ({
    collection
}:SidebarAccordionsType) => {

    return (
        <ul className="flex flex-col gap-4 text-muted-foreground ">
        {
            collection?.map((category) => (
                <Label  key={category.id} title={category.title} className="hover:text-foreground" >
                    <span>{category?.title}</span>
                   
                </Label>
            ))
        }
    </ul>
    )
}

export default SidebarAccordions