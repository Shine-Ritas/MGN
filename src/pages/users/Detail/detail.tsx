import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useUserAppDispatch, useUserAppSelector } from "@/redux/hooks";
import { selectUserReadSetting } from "@/redux/slices/userReadSetting/selectors";
import { setCurrentPage, setField, toggleValue } from "@/redux/slices/userReadSetting/user-read-setting-slice";
import readingStyleClasses from "@/utilities/read-helper";
import { PageProgressBar } from "./page-progress";
import ImageContainer from "./image-container";
import SettingModal from "@/pages/users/Detail/setting-modals/setting-modal";
import shortcutMapFactory, { shortcutActions } from "@/redux/slices/userReadSetting/short-cuts";
import useKeyboardShortcuts from "@/hooks/useKeyboardShortcuts";
import { handleHorizontalClick, handleVerticalClick } from "@/utilities/read-action";
import { useTemporaryAlert } from "@/hooks/useTemporaryAlert";
import { AlertComponent } from "@/components/ui/alert-component";
import { useScreenDetector } from "@/hooks/useScreenDetector";
import { getRandomInterval, isSubscriptionValid } from "@/utilities/util";
import FloatingToggle from "@/components/ui/floating-ball";
import useQuery from "@/hooks/useQuery";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { userReadedThisChapter } from "@/redux/slices/userReadSetting/user-read-slice";
import route from "@/utilities/router";
import { userRouteCollection } from "@/routes/data/user_route";
import DetailLoadingSkeleton from "./loading-skeleton";
import DetailHeader from "./detail-header";
import { selectAuthUser } from "@/redux/slices/user-global";
import { Lock, Crown } from "lucide-react";
import Goback from "@/components/goback-btn";
// import { toggleActionCollection, toggleActionCollectionKeys } from "@/redux/slices/userReadSetting/constants";

// Utility: prefetch images sequentially (one by one)
const prefetchImagesSequentially = (imagePaths: string[], onComplete?: () => void) => {
  if (imagePaths.length === 0) {
    onComplete?.();
    return;
  }

  const prefetchNext = (index: number) => {
    if (index >= imagePaths.length) {
      onComplete?.();
      return;
    }

    const img = new Image();
    img.onload = () => {
      // Wait a small delay before loading the next image to avoid overwhelming the browser
      setTimeout(() => prefetchNext(index + 1), 100);
    };
    img.onerror = () => {
      // Continue to next image even if one fails
      setTimeout(() => prefetchNext(index + 1), 100);
    };
    img.src = imagePaths[index];
  };

  prefetchNext(0);
};


const Detail = () => {
  // Always call hooks unconditionally
  const readSetting = useUserAppSelector(selectUserReadSetting);
  const [searchParams, setSearchParams] = useSearchParams({last_page:"false"});
  const last_page = searchParams.get("last_page") ?? "false"

  const {mogou,chapter} = useParams();
  const dispatch = useUserAppDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentImages, setCurrentImages] = useState<any[]>([]);
  const [prefetchedPages, setPrefetchedPages] = useState<Set<number>>(new Set());
  const [userCanRead, setUserCanRead] = useState(true);
  const isScrollingRef = useRef<boolean>(false);
  const { currentPage, totalPages, readingStyle, readingDirection } = readSetting;
  const readStyle = readingStyleClasses(readingStyle.value);

  // Call your query hook (always)
  const { data, isLoading } = useQuery(`/users/mogous/${mogou}/chapters/${chapter}`);

  const navigate = useNavigate();
  const authUser = useUserAppSelector(selectAuthUser);

  // Process API data with useMemo (only derive data, no side effects)
  const formattedImages = useMemo(() => {
    if (!data) return [];
    return data?.current_chapter?.images || [];
  }, [data]);

  // Compute chapter ID and URLs
  const chapterId = useMemo(() => {
    if (!data?.current_chapter) return null;
    return data.current_chapter.mogou_id + "-" + data.current_chapter.slug;
  }, [data]);

  const chapterUrls = useMemo(() => {
    if (!data) return { nextUrl: "", prevUrl: "" };
    const nextChapterUrl = data?.next_chapter 
      ? `/read/mogou/${data?.mogou?.slug}/chapters/${data?.next_chapter?.slug}` 
      : route(userRouteCollection.show, {slug: data?.mogou?.slug});
    const prevChapterUrl = data?.prev_chapter 
      ? `/read/mogou/${data?.mogou?.slug}/chapters/${data?.prev_chapter?.slug}` 
      : route(userRouteCollection.show, {slug: data?.mogou?.slug});
    return { nextUrl: nextChapterUrl, prevUrl: prevChapterUrl };
  }, [data]);

  // Handle chapter changes and URL updates in useEffect
  useEffect(() => {
    if (!chapterId) return;

    // if(data?.mogou?.mogou_type_name == "Manhwa"){
    //   dispatch(setField({key: "readingStyle", value: toggleActionCollection[toggleActionCollectionKeys.readingStyle]['LongStrip']}));
    //   dispatch(setField({key: "imageFit", value: toggleActionCollection[toggleActionCollectionKeys.imageFit]['Cover']}));

    // }else{
    //   dispatch(setField({key: "readingStyle", value: toggleActionCollection[toggleActionCollectionKeys.readingStyle]['SinglePage']}));
    //   dispatch(setField({key: "imageFit", value: toggleActionCollection[toggleActionCollectionKeys.imageFit]['Contain']}));
    // }

    // Check if chapter has changed
    if (readSetting.currentId !== chapterId) {
      dispatch(setField({key: "currentId", value: chapterId}));
      dispatch(setField({key: "currentPage", value: 1}));
      dispatch(setField({key: "totalPages", value: 1}));
      setPrefetchedPages(new Set());
    }

    // Update chapter URLs
    dispatch(setField({key: "prevUrl", value: chapterUrls.prevUrl}));
    dispatch(setField({key: "nextUrl", value: chapterUrls.nextUrl}));
  }, [chapterId, chapterUrls, dispatch, readSetting.currentId]);

  // Determine pagination values
  const max = readStyle.max ?? totalPages;
  const startIndex = readingStyle.value === "long-strip" ? 0 : currentPage - 1;
  const endIndex = readingStyle.value === "long-strip" ? formattedImages.length : Math.min(formattedImages.length, startIndex + max);

  // More hooks that must always be called:
  const shortcutMap = useMemo(() => shortcutMapFactory(dispatch, readSetting), [
    dispatch,
    readSetting,
  ]);
  const shortCutActions = shortcutActions(shortcutMap);
  useKeyboardShortcuts(shortCutActions);
  const { isMobile } = useScreenDetector();
  const { isVisible, message, showAlert } = useTemporaryAlert();

  // Effects: update images and prefetch adjacent images
  useEffect(() => {
    if (formattedImages.length > 0) {
      // Update total pages in the store
      dispatch(setField({ key: "totalPages", value: formattedImages.length }));
      dispatch(setField({ key: "serverResponse", value: data }));
      setCurrentImages(formattedImages.slice(startIndex, endIndex));

      if(last_page == "true"){
        dispatch(setCurrentPage({ action: "prefer", index: formattedImages.length }));
        // then remove the last_page from the search params
        setSearchParams({});
      }
    }
  }, [dispatch, formattedImages, startIndex, endIndex, max, data, readingStyle.value, last_page, setSearchParams]);

  // Sequential prefetching effect (separate from image display)
  useEffect(() => {
    if (formattedImages.length === 0 || readingStyle.value === "long-strip") return;

    const prefetchImages = () => {
      const prefetchCount = 3; // Number of next/prev pages to prefetch
      const pagesToPrefetch: number[] = [];
      
      // Prioritize next pages first
      for (let i = 1; i <= prefetchCount; i++) {
        const nextPageIndex = currentPage + i - 1; // Convert to 0-based index
        if (nextPageIndex < formattedImages.length && !prefetchedPages.has(nextPageIndex)) {
          pagesToPrefetch.push(nextPageIndex);
        }
      }

      // Then add previous pages with lower priority
      for (let i = 1; i <= Math.floor(prefetchCount / 2); i++) {
        const prevPageIndex = currentPage - i - 1; // Convert to 0-based index
        if (prevPageIndex >= 0 && !prefetchedPages.has(prevPageIndex)) {
          pagesToPrefetch.push(prevPageIndex);
        }
      }

      if (pagesToPrefetch.length > 0) {
        // Prefetch one page at a time, starting with the most immediate next page
        const pageIndexToPrefetch = pagesToPrefetch[0];
        const startIdx = pageIndexToPrefetch;
        const endIdx = Math.min(formattedImages.length, startIdx + readStyle.max);
        
        const imagesToPrefetch = formattedImages
          .slice(startIdx, endIdx)
          .map((img: any) => img?.path)
          .filter(Boolean);

        if (imagesToPrefetch.length > 0) {
          // Mark this page as being prefetched
          setPrefetchedPages(prev => {
            const newSet = new Set(prev);
            for (let i = startIdx; i < endIdx; i++) {
              newSet.add(i);
            }
            return newSet;
          });

          // Start sequential prefetching for this page
          prefetchImagesSequentially(imagesToPrefetch, () => {
            console.log(`Prefetched page ${pageIndexToPrefetch + 1} (${imagesToPrefetch.length} images)`);
          });
        }
      }
    };

    // Delay prefetching slightly to prioritize current page loading
    const prefetchTimer = setTimeout(prefetchImages, 500);
    
    return () => clearTimeout(prefetchTimer);
  }, [currentPage, formattedImages, readingStyle.value, readStyle.max, prefetchedPages]);
 
  useEffect(()=>{
    data?.current_chapter && setTimeout(()=>{
     dispatch(userReadedThisChapter({mogou_id:data?.current_chapter?.mogou_id,sub_mogou_id:data?.current_chapter?.id})as any);
    }
    ,1000)
  },[data?.current_chapter,dispatch])

  // Check subscription requirement
  useEffect(() => {
    if (data?.current_chapter?.subscription_only && !isSubscriptionValid(authUser?.subscription_end_date)) {
      setUserCanRead(false);
    } else {
      setUserCanRead(true);
    }
  }, [data?.current_chapter, authUser]);


  // Effect: mobile-specific alert
  useEffect(() => {
    if (isMobile) {
      const showAlertAtRandomInterval = () => {
        showAlert("Double click at center to toggle panel");
        const interval = getRandomInterval(5, 10);
        setTimeout(showAlertAtRandomInterval, interval);
      };
      showAlert("Double click at center to toggle panel");
      showAlertAtRandomInterval();
    }
  }, [isMobile, showAlert]);

  // Handlers (using useCallback)
  const handleScreenClick = useCallback(
    ({ clientX, clientY, currentTarget }: React.MouseEvent<HTMLDivElement>) => {
      // Prevent click handling during scroll on mobile devices in long-strip mode
      if (isMobile && readingStyle.value === "long-strip" && isScrollingRef.current) {
        return;
      }

      if (readingStyle.value === "long-strip") {
        handleVerticalClick(containerRef, clientY, dispatch, currentPage);
        return;
      }
      handleHorizontalClick(currentTarget, clientX, readingDirection, dispatch,navigate);
    },
    [readingStyle.value, readingDirection, dispatch, currentPage, navigate, isMobile]
  );

  const handlePageClick = useCallback(
    (index: number) => {
      dispatch(setCurrentPage({ action: "prefer", index }));
    },
    [dispatch]
  );

  const handleTogglePanel = useCallback(() => {
    dispatch(toggleValue("showPanel"));
  }, [dispatch]);

  // Handle subscription required case
  if (!isLoading && data && !userCanRead) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-background">
        <div className="flex flex-col items-center gap-4 max-w-md text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-muted to-phover shadow-lg">
            <Lock className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-muted to-phover">
              Premium Content
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              This chapter requires a subscription to access.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-gradient-to-r from-primary-muted/10 to-phover/10 p-3 border border-border shadow-sm mt-2">
            <Crown className="h-5 w-5 text-gold" />
            <p className="text-sm font-medium text-foreground">
              Unlock this chapter and all premium features with a subscription.
            </p>
          </div>
          <div className="mt-4">
            <Goback size="sm" to={data?.mogou ? route(userRouteCollection.show, {slug: data.mogou.slug}) : "/"} />
          </div>
        </div>
      </div>
    );
  }

  // Instead of returning early, conditionally render in the returned JSX.
  return (
    <>
      {(isLoading || !data) ? (
        <DetailLoadingSkeleton />
      ) : (
        <>
          <div
            className={`${readSetting.backgroundColor.value} cursor-pointer relative min-h-screen`}
            onClick={handleScreenClick}
          >

            <DetailHeader />

            <ImageContainer
              containerRef={containerRef}
              currentImages={currentImages}
            />
            { readingStyle.value != "long-strip" && <PageProgressBar
              className={`sticky bottom-[6px] left-0 ${readSetting.progressBar.value}`}
              totalPages={totalPages}
              onClick={handlePageClick}
              type={readSetting.progressBar.value}
            />
            }
          </div>
          <SettingModal isOpen={readSetting.modalBox} shortCuts={shortcutMap} />
          {isVisible && <AlertComponent message={message} />}
          <FloatingToggle
            isActive={readSetting.showPanel}
            onChange={handleTogglePanel}
          />
        </>
      )}
    </>
  );
};

export default Detail;
