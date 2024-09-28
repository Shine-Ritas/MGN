import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import { EyeIcon } from "lucide-react"
import useQuery from "@/hooks/useQuery"
import { SubscribedUser } from "./types"


const Users = () => {

    const { data: users, isLoading, } = useQuery(`admin/users?limit=9`);

    if (isLoading) {
        return;
    }

    const cards = users.users?.data.map((user: SubscribedUser) => (
        <Card key={user.id} className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105">
            <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                    <Tooltip>
                        <TooltipTrigger>
                            <Avatar className="w-16 h-16 border-2 border-primary shadow-md">
                                <AvatarImage src={user.user_code} alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>User since {user.created_at}</p>
                        </TooltipContent>
                    </Tooltip>
                    <div>
                        <h2 className="text-xl font-bold">{user.name}</h2>
                        <Tooltip>
                            <TooltipTrigger>
                                <p className="text-sm text-muted-foreground italic">{user.subscription_name}</p>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{user.subscription_name} plan</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="bg-secondary p-4">
                <div className="w-full flex justify-end">
                    <Button className="transition-all duration-300 hover:shadow-md">
                        <EyeIcon className="mr-2 h-4 w-4" /> View Profile
                    </Button>
                </div>
            </CardFooter>
        </Card>
    ));

    return (
        <main className="flex-1 items-start gap-4 pt-4 md:gap-8">
            <div className="mx-auto  flex-1 auto-rows-max gap-4 ">

                <TooltipProvider>
                    <div className=" mx-auto ">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {cards}
                        </div>
                    </div>
                </TooltipProvider>
            </div>
        </main>

    )
};

export default Users