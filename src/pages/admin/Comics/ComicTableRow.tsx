import {

TableCell,
TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {  MogousType } from "./type"

const ComicTableRow = ({mogous } : {mogous : MogousType}) => {

    const mogousStatusColor = function (status: string) {
        switch (status) {
            case "Archived":
                return "destructive";
            case "Draft":
                return "gold";
            case "Published":
                return "default";
            default:
                return "default";
        }
    }
  return (
    <TableRow key={mogous.id}>
            <TableCell className=" ">
                    {/* moogous cover */}
                <img src={mogous.cover} alt="cover" className="w-32 h-40 md:h-32 md:w-32 !rounded-sm" />
              
            </TableCell>
            <TableCell className="font-medium  truncate ...">
                {/* concat the string to 20 words only */}
                {mogous.title.length > 20
                    ? `${mogous.title.substring(0, 20)}...`
                    : mogous.title}
                
            </TableCell>
            <TableCell>
                <Badge className="w-20 flex justify-center" variant={mogousStatusColor(mogous.status_name)}>{mogous.status_name}</Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
                {mogous.sub_mogous.length}
            </TableCell>
            <TableCell className="hidden md:table-cell">25.k</TableCell>
            <TableCell className="hidden md:table-cell">
                {mogous.created_at ? new Date(mogous.created_at).toDateString() : "N/A"}
            </TableCell>
            <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
  )
}

export default ComicTableRow