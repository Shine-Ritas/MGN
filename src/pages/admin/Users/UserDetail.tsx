import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { EyeIcon, HeartIcon } from "lucide-react"
import UserDetailAction from "./UserDetailAction"
import UserInfoDetail from "./UserInfoDetail"
import useQuery from "@/hooks/useQuery"
import { useParams } from "react-router-dom"
import Goback from "@/components/goback-btn"
import { SubscribedUser } from "./types"
import { useEffect, useState } from "react"
import UserDetailHistory from "./UserDetailHistory"
import { eventEmitter } from "@/utilities/event-emitter"
import { rTitle } from "@/utilities/util"

export type UserLoginHistoryType = {
  location: string
  country: string
  device: string
  login_at: string
}

export type UserSubscriptionHistoryType = {
  id: number
  title: string
  price: string
  created_at: string
}



export default function UserDetail() {

  const { id } = useParams<{ id: string }>();
  const [currentUser, setCurrentUser] = useState<SubscribedUser | null>(null);
  const [subscription_histroy, setSubscription_histroy] = useState<UserSubscriptionHistoryType[]>([]);
  const [userLoginHistory, setUserLoginHistory] = useState<UserLoginHistoryType[]>([]);

  const { data, isLoading } = useQuery(`/admin/users/showById/${id}`, undefined, true);

  useEffect(() => {

    if (!isLoading) {
      setCurrentUser(data?.user)
      setSubscription_histroy(data?.subscriptions)
      setUserLoginHistory(data?.login_history)
    }

    eventEmitter.on("updateSubscriptionHistory", (data: any) => {

      setSubscription_histroy((prev: any) => [ data,...prev])
    })

    return () => {
      setCurrentUser(null)
      setSubscription_histroy([])
      setUserLoginHistory([])
      eventEmitter.off("updateSubscriptionHistory")
    }

  }, [data, isLoading])


  if (!currentUser) {
    return <div>User not found</div>
  }

  return (
    <div className="pt-3 space-y-6">
      <div className="flex items-center gap-4 mb-10">
        <Goback to={-1} />
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          User Detail
        </h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <UserInfoDetail user={currentUser!} setCurrentUser={setCurrentUser} />
        <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
          <UserDetailAction user={currentUser!} setCurrentUser={setCurrentUser} />

          <UserDetailHistory loginHistory={userLoginHistory} subscription_histroy={subscription_histroy} />
        </div>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Favorite Comics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {data?.favorites.map((fav, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="aspect-[3/4] relative mb-4">
                      <img
                        src={fav?.mogou.cover}
                        alt={fav?.mogou?.title}
                        className="object-cover rounded-md"
                        style={{ width: '100%', height: '100%' }}
                      />
                      <HeartIcon className="absolute top-2 right-2 w-6 h-6 text-red-500" />
                    </div>
                    <h3 className="font-bold mb-2 text-sm">{rTitle(fav?.mogou?.title,25)}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <EyeIcon className="w-4 h-4 mr-1" />
                      11 views
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}