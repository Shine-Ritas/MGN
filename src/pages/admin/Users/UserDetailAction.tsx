"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { UserX,Calendar } from "lucide-react"
import UserChangeSubscription from "./UserChangeSubscription"
import { SubscribedUser } from "./types"
import useMutate from "@/hooks/useMutate"

export default function UserDetailAction({user,setCurrentUser}: {user: SubscribedUser,setCurrentUser:any}) {
  const [isActive, setIsActive] = useState(user.active)
  const [subscriptionDays, setSubscriptionDays] = useState(30)
  const { toast } = useToast()

  const [serverAction,{isLoading}] = useMutate();

  const simulateApiCall = (action: string, callback: () => void) => {
    toast({
      title: "Processing...",
      description: `${action} in progress.`,
    })
    setTimeout(() => {
      callback()
      toast({
        title: "Success",
        description: `${action} completed successfully.`,
      })
    }, 1500)
  }

  const handleDeactivate = async() => {
    const response = await serverAction(`admin/users/update`,{
      id: user.id,
      user_code: user.user_code,
      active: !user.active,
      password:null
    })
    if (response && !response.error) {
      setIsActive(!isActive)
    }
  }

  const handleAddExtraDays = (days: number) => {
    simulateApiCall(`Adding ${days} extra days`, () => setSubscriptionDays(subscriptionDays + days))
  }

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>User Management Actions</CardTitle>
        <CardDescription>Manage user account and subscription</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Button
            variant={isActive ? "outline" : "destructive"}
            className="w-full justify-start"
            onClick={handleDeactivate}
            disabled={isLoading}
          >
            <UserX className="mr-2 h-4 w-4" />
            {isActive ? "Deactivate User" : "User Deactivated"}
          </Button>

          <UserChangeSubscription user={user}  setCurrentUser={setCurrentUser}/>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Add Extra Days
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Extra Subscription Days</DialogTitle>
                <DialogDescription>Enter the number of days to add to the subscription.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Label htmlFor="days">Number of Days</Label>
                <Input id="days" type="number" min="1" placeholder="Enter number of days" />
              </div>
              <DialogFooter>
                <Button onClick={() => handleAddExtraDays(7)}>Add Days</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          User Status: {isActive ? "Active" : "Inactive"} | 
          Subscription Days: {subscriptionDays} 
        </div>
      </CardContent>
    </Card>
  )
}