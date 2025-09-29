import { Card, CardContent } from "@/components/ui/card"
import { Mail,UserRoundCog } from "lucide-react"
import useQuery from "@/hooks/useQuery"
import { UserSubscriptionHistoryType } from "@/pages/admin/Users/UserDetail"
import UserSubscriptionHistory from "@/pages/admin/Users/UserSubscriptionHistory"
import { useUserAppDispatch, useUserAppSelector } from "@/redux/hooks"
import { selectAuthUser, setUser } from "@/redux/slices/user-global"
import MogouFavoriteCard from "@/components/ui/mogou-card/MogouFavoriteCard"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import UserAvatar from "@/components/users/UserAvatar"
import { Skeleton } from "@/components/ui/skeleton"
import { lazy, Suspense, useState } from "react"
import ProfileCardSkeleton from "./ProfileCardSkeleton"
import BookmarksSkeleton from "./BookmarksSkeleton"
import SubscriptionHistorySkeleton from "./SubscriptionHistorySkeleton"
import UserProfileModalSkeleton from "./UserProfileModalSkeleton"
import Goback from "@/components/goback-btn"
const UserProfileModal = lazy(() => import('./UserAvatarModal'));


export default function UserProfile() {

  const [modalOpen, setModalOpen] = useState(false);
  const { data, isLoading } = useQuery(`/users/profile`, undefined, true);

  const storedUser = useUserAppSelector(selectAuthUser);
  const dispatch = useUserAppDispatch();

  if (isLoading) {
    return (
      <div className="pt-8 px-4 md:px-0">
        <div className="mb-6">
          <Goback to={-1} />
        </div>
        <ProfileCardSkeleton />
        <SubscriptionHistorySkeleton />
        {/* Bookmarks Section Skeleton */}
        <Skeleton className="h-8 w-40 mb-6" />
        <BookmarksSkeleton />
      </div>
    );
  }
  data?.user && dispatch(setUser(data?.user));

  return (
    <div className="pt-8  px-4 md:px-0">
      <div className="mb-6">
        <Goback to={-1} />
      </div>
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger >
                  <UserAvatar user={data?.user} shape='rounded' />
            </DialogTrigger>
             {
               modalOpen && <Suspense fallback={<UserProfileModalSkeleton />}>
                    <UserProfileModal user={data?.user} />
                  </Suspense>
             }
          </Dialog>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">{storedUser?.name}</h1>
              {/* <p className="text-muted-foreground mb-4">{userData.bio}</p> */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <div className="flex items-center gap-2 ">
                  <UserRoundCog className="w-4 h-4" />
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

      <h2 className="text-2xl font-bold mt-8 mb-6">BookMarked List</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-7 gap-4 ">
        {data?.favorites.map((manga: any) => (
           <MogouFavoriteCard key={manga.id} mogou={manga} />
        ))}
      </div>
    </div>
  )
}