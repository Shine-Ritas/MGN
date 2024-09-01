
import {
    Tabs,

} from "@/components/ui/tabs"
import SubscriptionTable from "./SubscriptionTable"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { SingleFilterSelect } from "@/components/ui/custom/SIngleFilterSelect"
import { adminRouteCollection } from "@/constants/constants"
import { Label } from "@radix-ui/react-label"
import { useState } from "react"


const sortSubscription = {
    "Max Subscriptions" : "desc",
    "Min Subscriptions" : "asc",
  };

const sortSubscriptionPrice = {
    "Max Price" : "desc",
    "Min Price" : "asc",
};



const SubscriptionIndex = () => {

    const navigate = useNavigate();
    const [countBy,setCountBy] = useState<string>("");
    const [priceBy,setPriceBy] = useState<string>("");


    const subscriptionCountOnChange = ((value:any)=>{
        setCountBy(value)
    })

    const subscriptionPriceOnChange = ((value:any)=>{
        setPriceBy(value)
    })

    return (
        <main className="h-full flex-1 items-start gap-4 px-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto flex-1 auto-rows-max grid grid-cols-1 gap-3">

                <Tabs defaultValue="all" className="w-full justify-between">
                    <div className="flex items-center w-full justify-between">

                        <div className="flex items-center gap-4">

                            <Label >Sort By :</Label>

                            <SingleFilterSelect data={sortSubscription} onSelect={(value:any) => subscriptionCountOnChange(value)} placeholder="Sort By Sub Count" />
                        </div>

                        <div className="flex items-center gap-4">

                            <Label >Sort By :</Label>

                            <SingleFilterSelect data={sortSubscriptionPrice} onSelect={(value:any) => subscriptionPriceOnChange(value)} placeholder="Sort By Price" />
                        </div>
                       
                        <div className="ml-auto flex items-center gap-2">


                            <Button size="sm" className="h-8 gap-1" onClick={() => navigate(adminRouteCollection.addSubscription)} >
                                <PlusCircle className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Add
                                </span>
                            </Button>
                        </div>
                    </div>
                </Tabs>
        
                <div className="mt-8 min-h-full">
                    <SubscriptionTable countBy={countBy} priceBy={priceBy} />
                </div>
            </div>
        </main>
    )
}

export default SubscriptionIndex