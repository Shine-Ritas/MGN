"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { UserX, Bell, Package, Pause, Calendar } from "lucide-react"

export default function UserDetailAction() {
  const [isActive, setIsActive] = useState(true)
  const [subscriptionDays, setSubscriptionDays] = useState(30)
  const [isOnHold, setIsOnHold] = useState(false)
  const { toast } = useToast()

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

  const handleDeactivate = () => {
    simulateApiCall("User deactivation", () => setIsActive(false))
  }

  const handleNotify = () => {
    simulateApiCall("User notification", () => {
      // In a real app, this would send a notification to the user
    })
  }

  const handleChangeSubscription = (newPackage: string) => {
    simulateApiCall(`Subscription change to ${newPackage}`, () => {
      // In a real app, this would update the user's subscription package
    })
  }

  const handleTemporaryHold = () => {
    simulateApiCall(isOnHold ? "Temporary hold removal" : "Temporary hold", () => setIsOnHold(!isOnHold))
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
            variant="outline"
            className="w-full justify-start"
            onClick={handleDeactivate}
            disabled={!isActive}
          >
            <UserX className="mr-2 h-4 w-4" />
            {isActive ? "Deactivate User" : "User Deactivated"}
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleNotify}
          >
            <Bell className="mr-2 h-4 w-4" />
            Notify User
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <Package className="mr-2 h-4 w-4" />
                Change Subscription
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change Subscription Package</DialogTitle>
                <DialogDescription>Select a new subscription package for the user.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Button onClick={() => handleChangeSubscription("Basic")}>Basic Package</Button>
                <Button onClick={() => handleChangeSubscription("Premium")}>Premium Package</Button>
                <Button onClick={() => handleChangeSubscription("Pro")}>Pro Package</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleTemporaryHold}
          >
            <Pause className="mr-2 h-4 w-4" />
            {isOnHold ? "Remove Hold" : "Temporary Hold"}
          </Button>

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
          Subscription Days: {subscriptionDays} | 
          Hold Status: {isOnHold ? "On Hold" : "Active"}
        </div>
      </CardContent>
    </Card>
  )
}