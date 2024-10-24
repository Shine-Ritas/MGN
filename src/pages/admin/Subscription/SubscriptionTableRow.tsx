import { Badge } from "@/components/ui/badge";
import {
    TableCell,
    TableRow,
} from "@/components/ui/table";

import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AlertBox from "@/components/ui/AlertBox";
import { SubscriptionType } from "./type";
import { useNavigate } from "react-router-dom";
// import { adminRouteCollection } from "@/constants/constants";
import useMutate from "@/hooks/useMutate";

interface SubscriptionTableRowProps {
    index: number;
    subscription:SubscriptionType
}

const SubscriptionTableRow = ({index,subscription} : SubscriptionTableRowProps) => {

    const navigate = useNavigate();

    const [postSubscription, { isLoading }] = useMutate({callback:()=>{}});

    const deleteSubscription = async (id: number) => {
        await postSubscription(`admin/subscriptions/${id}`) as any;
    }

  return (
    <TableRow key={index}>

    <TableCell className="font-medium">
        {subscription?.title}
    </TableCell>
    <TableCell>
        <Badge variant="outline">
        {subscription?.duration} {subscription?.duration > 1 ? 'Days' : 'Day'}

        </Badge>
    </TableCell>

    <TableCell className="">
        <Badge variant="outline">{
            subscription?.max
        } </Badge>
    </TableCell>

    <TableCell className="">
        <Badge variant="outline">{
            subscription?.price
        } </Badge>
    </TableCell>

    <TableCell className="">
        <Badge variant="outline">{
            subscription?.users_count
        } </Badge>
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
                <DropdownMenuItem onClick={
                    ()=>navigate(`/admin/subscriptions/edit/${subscription?.id}`)
                }>Edit</DropdownMenuItem>


                {/* <DropdownMenuItem slot=""> */}
                <AlertBox alertTitle="Delete" alertDescription="Are you sure you want to Delete" alertActionConfirmText="Delete" alertConfirmAction={()=>deleteSubscription(subscription.id !)}
                disabled={isLoading}
                    className="relative flex cursor-default select-none  w-full hover:bg-accent text-destructive items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                    btnText="Delete" />
                {/* </DropdownMenuItem> */}
            </DropdownMenuContent>
        </DropdownMenu>
    </TableCell>
</TableRow>
  )
}

export default SubscriptionTableRow