import { Skeleton } from "@/components/ui/skeleton";

const BookmarksSkeleton = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-7 gap-4">
    {Array.from({ length: 14 }).map((_, index) => (
      <div key={index} className="flex flex-col">
        <Skeleton className="w-full h-64 rounded-t-sm" />
        <Skeleton className="w-full h-8 rounded-b-sm" />
      </div>
    ))}
  </div>
);

export default BookmarksSkeleton;
