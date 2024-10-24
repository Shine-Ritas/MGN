"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { UserX } from "lucide-react"
import UserChangeSubscription from "./UserChangeSubscription"
import { SubscribedUser } from "./types"
import useMutate from "@/hooks/useMutate"
import { timeLeft } from "@/utilities/util"

export default function UserDetailAction({user,setCurrentUser}: {user: SubscribedUser,setCurrentUser:any}) {
  const [isActive, setIsActive] = useState(user.active)

  const [serverAction,{isLoading}] = useMutate();

  const time_left  = timeLeft(user?.subscription_end_date);

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

        
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          User Status: {isActive ? "Active" : "Inactive"} | 
          Subscription : {time_left}
        </div>
      </CardContent>
    </Card>
  )
}