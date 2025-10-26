import { useUserAppSelector } from "@/redux/hooks";
import { selectUserReadSetting } from "@/redux/slices/userReadSetting/selectors";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { handleChapterSwitch } from "@/redux/slices/userReadSetting/user-read-setting-slice";

const DetailHeader = () => {

    const readSetting = useUserAppSelector(selectUserReadSetting);
    const chapter = readSetting?.serverResponse;
    const navigate = useNavigate();
    
    const currentChapterNumber = chapter?.current_chapter?.chapter_number;
    const allChapters = chapter?.all_chapters || [];
    
    // Check if there are previous/next chapters based on chapter numbers
    const hasPreviousChapter = allChapters.some(
      (ch) => ch.chapter_number < currentChapterNumber
    );
    const hasNextChapter = allChapters.some(
      (ch) => ch.chapter_number > currentChapterNumber
    );
    
    const handlePrevChapter = () => {
      handleChapterSwitch("prev", navigate);
    };
    
    const handleNextChapter = () => {
      handleChapterSwitch("next", navigate);
    };
    
    const handleGoToDetail = () => {
      navigate(`/show/${chapter?.mogou?.slug}`);
    };
    
  return (
    <div className="pt-2">
          <div className="flex items-center justify-between">
            <div className="px-4 md:px-12 lg:px-24 flex flex-col">
              <span className="text-lg">{chapter?.current_chapter?.title}</span>
              <span className="text-neon-primary">{chapter?.mogou.title}</span>
            </div>

            <div className="flex items-center gap-2 px-4 md:px-12 lg:px-24">
              {!hasPreviousChapter && !hasNextChapter ? (
                // Only one chapter exists - show single Detail button
                <Button
                  variant={"secondary"}
                  size="sm"
                  onClick={handleGoToDetail}
                  className="flex items-center gap-1  "
                >
                  Home
                </Button>
              ) : (
                <>
                  {hasPreviousChapter ? (
                    <Button
                      variant="default"
                      size="sm"
                      onClick={handlePrevChapter}
                      className="flex items-center gap-1"
                    >
                      <ChevronLeftIcon size={16} />
                      Previous
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={handleGoToDetail}
                      className="flex items-center gap-1 bg-primary hover:bg-primary/90"
                    >
                      Detail
                    </Button>
                  )}
                  
                  {hasNextChapter ? (
                    <Button
                      variant="default"
                      size="sm"
                      onClick={handleNextChapter}
                      className="flex items-center gap-1"
                    >
                      Next
                      <ChevronRightIcon size={16} />
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={handleGoToDetail}
                      className="flex items-center gap-1 bg-primary hover:bg-primary/90"
                    >
                      Detail
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        <Separator className="w-full h-[2px] bg-primary mt-4" />
    </div>
  )
}

export default DetailHeader