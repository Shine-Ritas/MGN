import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const UserDetailSkeleton = () => {
  return (
    <div className="pt-3 space-y-6">
      <div className="flex items-center gap-4 mb-10">
        <Skeleton className="h-10 w-10 rounded-md" />
        <Skeleton className="h-7 w-32" />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {/* UserInfoDetail Skeleton */}
        <Card className="col-span-2 md:col-span-1">
          <CardHeader className="relative">
            <CardTitle>
              <Skeleton className="h-6 w-32" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="h-4 w-40 mt-2" />
            </CardDescription>
            <Skeleton className="absolute right-5 top-3 h-9 w-20" />
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <div className="flex items-center">
                  <Skeleton className="h-5 w-5 mr-2" />
                  <Skeleton className="h-10 flex-1" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* UserDetailAction and UserDetailHistory Skeleton */}
        <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
          {/* UserDetailAction Skeleton */}
          <Card className="w-full max-w-3xl">
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-6 w-48" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="h-4 w-56 mt-2" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-4 w-64 mt-4" />
            </CardContent>
          </Card>

          {/* UserDetailHistory Skeleton */}
          <Card className="w-full">
            <CardHeader>
              <div className="flex gap-2">
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-9 w-32" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 border rounded-md">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-20 ml-auto" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Favorite Comics Skeleton */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-40" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {Array.from({ length: 5 }).map((_, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="aspect-[3/4] relative mb-4">
                      <Skeleton className="w-full h-full rounded-md" />
                      <Skeleton className="absolute top-2 right-2 w-6 h-6 rounded-full" />
                    </div>
                    <Skeleton className="h-4 w-full mb-2" />
                    <div className="flex items-center gap-1">
                      <Skeleton className="w-4 h-4" />
                      <Skeleton className="h-3 w-16" />
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

export default UserDetailSkeleton

