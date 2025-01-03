import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

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

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    userCode: "JD123456",
    subscription: "Premium",
    subscriptionEndDate: "2023-12-31",
    favoritedComics: [
      { title: "Spider-Man", description: "The amazing web-slinger", views: 1000000, image: "/placeholder.svg?height=200&width=150" },
      { title: "Batman", description: "The Dark Knight", views: 950000, image: "/placeholder.svg?height=200&width=150" },
      { title: "Wonder Woman", description: "Amazonian princess", views: 900000, image: "/placeholder.svg?height=200&width=150" },
      { title: "X-Men", description: "Mutant superheroes", views: 850000, image: "/placeholder.svg?height=200&width=150" },
      { title: "Nani web", description: "Mutant superheroes", views: 123212, image: "/placeholder.svg?height=200&width=150" },
      { title: "Acelase", description: "Mutant superheroes", views: 2132, image: "/placeholder.svg?height=200&width=150" },
    ],
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
        <div className="flex flex-col gap-4">
          <UserDetailAction user={currentUser!} setCurrentUser={setCurrentUser} />

          <UserDetailHistory loginHistory={userLoginHistory} subscription_histroy={subscription_histroy} />
        </div>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Favorite Comics</CardTitle>
            <CardDescription>Your most loved comic books</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
              {user.favoritedComics.map((comic, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="aspect-[3/4] relative mb-4">
                      <img
                        src={comic.image}
                        alt={comic.title}
                        className="object-cover rounded-md"
                        style={{ width: '100%', height: '100%' }}
                      />
                      <HeartIcon className="absolute top-2 right-2 w-6 h-6 text-red-500" />
                    </div>
                    <h3 className="font-bold mb-2">{comic.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{comic.description}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <EyeIcon className="w-4 h-4 mr-1" />
                      {comic.views.toLocaleString()} views
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