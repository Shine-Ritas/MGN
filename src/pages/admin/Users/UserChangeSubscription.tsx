import { Button } from '@/components/ui/button'
import useQuery from '@/hooks/useQuery'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { SubscriptionType } from '../Subscription/type'
import { Package } from 'lucide-react'
import useMutate from '@/hooks/useMutate'
import { SubscribedUser } from './types'
import { toast } from '@/components/ui/use-toast'

const UserChangeSubscription = ({user,setCurrentUser}:{user:SubscribedUser,setCurrentUser:any}) => {

    const { data, isLoading } = useQuery("admin/subscriptions");
    const [serverAction,{isLoading:isMutating}] = useMutate();

    const handleChangeSubscription = async(newPackage: number) => {
       
        const action = await serverAction(`admin/users/update`,{
            user_code: user.user_code,
            id: user.id,
            current_subscription_id: newPackage,
            password:null
        });

        if(action && !action.error){
           toast({
                title: "Success",
                description: "Subscription Changed Successfully",
                variant: "success"
           });

           setCurrentUser((prev:SubscribedUser)=>({
                ...prev,
                current_subscription_id: newPackage,
                subscription_end_date: action?.user?.subscription_end_date,
                subscription_name: data?.subscriptions?.data.find((sub:SubscriptionType)=>sub.id === newPackage)?.title
              }))
        }
    }
    return (

        <Dialog >
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                    <Package className="mr-2 h-4 w-4" />
                    Change Subscription
                </Button>
            </DialogTrigger>
            <DialogContent >
                <DialogHeader>
                    <DialogTitle>Change Subscription Package</DialogTitle>
                    <DialogDescription>Select a new subscription package for the user.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {
                        !isLoading && data?.subscriptions?.data.map((subscription: SubscriptionType) => (
                            <Button
                            disabled={isMutating || subscription.id === user.current_subscription_id}
                            key={subscription.id} onClick={() => handleChangeSubscription(subscription.id !)}>
                                {subscription.title} ( {subscription.duration} days ) 
                                </Button>
                        ))
                    }
                </div>
            </DialogContent>
        </Dialog>

    )
}

export default UserChangeSubscription