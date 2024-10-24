import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { EyeIcon, PlusCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from 'react-router-dom'
import { adminRouteCollection } from '@/constants/constants'
import useQuery from '@/hooks/useQuery'
import { SubscribedUser } from './types'
import { TablePagination } from "@/components/TablePagination"
import UserFilter from "./UserFilter"
import useFilterState from "@/hooks/useFilterState"

const getSubscriptionStatusColor = (date: string) => {
  const currentDate = new Date();
  const subscriptionDate = new Date(date);
  const warningDate = new Date(subscriptionDate);
  warningDate.setDate(subscriptionDate.getDate() - 3);

  if (currentDate > subscriptionDate) {
    return { color: 'bg-red-500', text: 'Expired' };
  } else if (currentDate >= warningDate && currentDate <= subscriptionDate) {
    return { color: 'bg-yellow-500', text: 'Expiring Soon' };
  } else {
    return { color: 'bg-green-500', text: 'Active' };
  }
};

const initialState = {
  active: "",
  subscriptions: "",
  search : "",
  page : 1,
}

export default function Component() {
  const { bunUrl, handleChange : handleFilter,getByKey } = useFilterState(initialState,['page']);

  const navigate = useNavigate();

  const {data , isLoading,isFetching} = useQuery(`/admin/users?${bunUrl}&limit=9`);

  return (
    <TooltipProvider>
      <div className="py-4">

        <div className="w-full flex justify-between">
            <div className="">
              <UserFilter getByKey={getByKey} handleFilter={handleFilter} total={data?.users.total}/>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex ">{data && data.users.data.length > 0 && (
              <TablePagination
                url={data.users.path}
                lastPage={data.users.last_page}
                currentPage={getByKey("page")}
                setCurrentPage={(page) => handleFilter("page", page)}
                isFetching={isFetching}
                paging={false}
              />
            )}</div>
              <Button 
              onClick={() => navigate(adminRouteCollection.addUser)}
              className="transition-all duration-300 hover:shadow-md">
                <PlusCircle className="mr-2 h-4 w-4" /> New User
              </Button> 
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {isLoading ? (
            // Skeleton loader
            Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="w-full h-64 animate-pulse bg-muted" />
            ))
          ) : (
            data?.users?.data.map((user : SubscribedUser) => (
              <Card key={user.id} className="w-full overflow-hidden hover:shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <Tooltip>
                        <TooltipTrigger>
                          <Avatar className="w-16 h-16 border-2 border-neon-primary shadow-md">
                            <AvatarImage src={user?.name} alt={user.name} />
                            <AvatarFallback
                            className="bg-primary text-white"
                            >{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>User since {user.created_at}</p>
                        </TooltipContent>
                      </Tooltip>
                      <div>
                        <h2 className="text-lg font">{user.name}</h2>
                        <Tooltip>
                          <TooltipTrigger>
                            <p className="text-xs text-muted-foreground italic">{user.subscription_name}</p>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{user.subscription_name} plan</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                    <Badge className={`${getSubscriptionStatusColor(user.subscription_end_date).color} text-white text-[10px]`}>
                      {getSubscriptionStatusColor(user.subscription_end_date).text}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mb-4">
                    Last login: {user.last_login_at}
                  </div>
                </CardContent>
                <CardFooter className="bg-secondary p-4">
                  <div className="w-full flex justify-between items-center">
                   <div className=""></div>
                    <Button
                    onClick={() => navigate(adminRouteCollection.showUser.replace(":id", user.id as unknown as string))}
                    size="sm" 
                    className="transition-all duration-300 hover:shadow-md">
                      <EyeIcon className="mr-2 h-4 w-4" /> View Profile
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </TooltipProvider>
  )
}