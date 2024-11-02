import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Mail, CreditCard, UserRoundCog } from "lucide-react"
import useQuery from "@/hooks/useQuery"
import { UserSubscriptionHistoryType } from "@/pages/admin/Users/UserDetail"
import UserSubscriptionHistory from "@/pages/admin/Users/UserSubscriptionHistory"
import UserProfileModal from "./UserAvatarModal"
import { useUserAppSelector } from "@/redux/hooks"
import { selectAuthUser } from "@/redux/slices/user-global"

// Simulated user data
const userData = {
  username: "MangaLover42",
  email: "mangalover42@example.com",
  location: "Tokyo, Japan",
  avatarUrl: "/placeholder.svg?height=128&width=128&text=ML",
  bio: "Avid manga reader and collector. Always looking for new series to dive into!",
}

// Simulated favorite manga data
const favoriteManga = [
  { id: 1, title: "One Piece", coverUrl: "/placeholder.svg?height=320&width=240&text=One Piece" },
  { id: 2, title: "Naruto", coverUrl: "/placeholder.svg?height=320&width=240&text=Naruto" },
  { id: 3, title: "Attack on Titan", coverUrl: "/placeholder.svg?height=320&width=240&text=AoT" },
  { id: 4, title: "My Hero Academia", coverUrl: "/placeholder.svg?height=320&width=240&text=MHA" },
  { id: 5, title: "Death Note", coverUrl: "/placeholder.svg?height=320&width=240&text=Death Note" },
  { id: 6, title: "Fullmetal Alchemist", coverUrl: "/placeholder.svg?height=320&width=240&text=FMA" },
]

export default function UserProfile() {


  const { data, isLoading } = useQuery(`/users/profile`, undefined, true);

  const storedUser = useUserAppSelector(selectAuthUser);

  if (isLoading) {
    return <div>Loading...</div>
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <UserProfileModal user={storedUser} />
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">{storedUser?.name}</h1>
              <p className="text-muted-foreground mb-4">{userData.bio}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <div className="flex items-center gap-2 ">
                  <UserRoundCog className="w-4 h-4"/>
                  <span className="text-muted-foreground">{storedUser?.user_code}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span className="text-muted-foreground">{storedUser?.email}</span>
                </div>
             
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <UserSubscriptionHistory setCurrentTable={null} history={data?.subscriptions as UserSubscriptionHistoryType[] ?? []} />

      <h2 className="text-2xl font-bold mb-4">Favorite Manga</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {favoriteManga.map((manga) => (
          <Card key={manga.id} className="overflow-hidden">
            <CardContent className="p-0">
              <img
                src={manga.coverUrl}
                alt={manga.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-2">
                <h3 className="text-sm font-semibold truncate">{manga.title}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-4">
        <Button className="flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          View All Favorites
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <CreditCard className="w-4 h-4" />
          Manage Subscription
        </Button>
      </div>
    </div>
  )
}