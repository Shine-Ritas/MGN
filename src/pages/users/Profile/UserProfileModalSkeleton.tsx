import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const UserProfileModalSkeleton = () => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
    <Card className="w-96 max-w-md">
      <CardContent className="p-6">
        <div className="space-y-4">
          <Skeleton className="w-32 h-32 rounded-lg mx-auto" />
          <Skeleton className="h-6 w-48 mx-auto" />
          <Skeleton className="h-4 w-32 mx-auto" />
        </div>
      </CardContent>
    </Card>
  </div>
);

export default UserProfileModalSkeleton;
