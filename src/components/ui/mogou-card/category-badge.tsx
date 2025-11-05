import { Badge } from "../badge"

const CategoryBadge = ({ category, index,onClick }: { category: any, index: number, onClick?: () => void }) => {
    return <Badge
        variant={category.is_adult ? "default" : "default"}
        className={category.is_adult ? "bg-red-900/80 cursor-pointer" : "bg-primary cursor-pointer"}
        onClick={onClick}
    >
        {category.title}
    </Badge>
}

export default CategoryBadge