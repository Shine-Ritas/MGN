import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileCardSkeleton = () => (
  <Card className="mb-8">
    <CardContent className="p-6">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Avatar Skeleton */}
        <Skeleton className="w-24 h-24 rounded-lg" />
        
        {/* User Info Skeleton */}
        <div className="flex-1 text-center md:text-left">
          <Skeleton className="h-8 w-48 mb-2 mx-auto md:mx-0" />
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-4">
            <div className="flex items-center gap-2">
              <Skeleton className="w-4 h-4" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="w-4 h-4" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default ProfileCardSkeleton;
