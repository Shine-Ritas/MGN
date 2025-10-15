import { Skeleton } from "@/components/ui/skeleton";
import { useUserAppSelector } from "@/redux/hooks";
import { selectUserReadSetting } from "@/redux/slices/userReadSetting/selectors";
import readingStyleClasses from "@/utilities/read-helper";

const DetailLoadingSkeleton = () => {
  const readSetting = useUserAppSelector(selectUserReadSetting);
  const readStyle = readingStyleClasses(readSetting.readingStyle.value);
  
  // Generate skeleton images based on reading style
  const generateSkeletonImages = () => {
    const imageCount = readSetting.readingStyle.value === "long-strip" ? 8 : (readStyle.max || 1);
    return Array.from({ length: imageCount }, (_, index) => (
      <Skeleton
        key={index}
        className={`${readStyle.imageClass} ${readSetting.imageFit.value} bg-muted/20`}
      />
    ));
  };

  return (
    <div className={`${readSetting.backgroundColor.value} min-h-screen`}>
      {/* Main content skeleton */}
      <div className={`${readStyle.class} min-h-screen`}>
        {generateSkeletonImages()}
      </div>
      
      {/* Progress bar skeleton */}
      <div className={`sticky bottom-[6px] left-0 ${readSetting.progressBar.value}`}>
        <div className="flex items-center justify-center gap-1 p-2">
          {/* Progress dots skeleton */}
          {Array.from({ length: 12 }, (_, index) => (
            <Skeleton
              key={index}
              className="w-2 h-2 rounded-full bg-muted/30"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailLoadingSkeleton;
