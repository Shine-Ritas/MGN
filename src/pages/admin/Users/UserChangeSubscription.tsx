import { Button } from '@/components/ui/button'
import useQuery from '@/hooks/useQuery'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { SubscriptionType } from '../Subscription/type'
import { Package } from 'lucide-react'

const UserChangeSubscription = () => {

    const { data, isLoading } = useQuery("admin/subscriptions");

    const handleChangeSubscription = (newPackage: string) => {
        // In a real app, this would update the user's subscription
        console.log(`Subscription change to ${newPackage}`)
    }

    return (

        <Dialog>
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
                            <Button key={subscription.id} onClick={() => handleChangeSubscription(subscription.title)}>{subscription.title}</Button>
                        ))
                    }
                </div>
            </DialogContent>
        </Dialog>

    )
}

export default UserChangeSubscription