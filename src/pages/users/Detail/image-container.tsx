import React, { useEffect, useRef, useCallback } from "react";
import { useUserAppDispatch, useUserAppSelector } from "@/redux/hooks";
import { selectUserReadSetting } from "@/redux/slices/userReadSetting/selectors";
import readingStyleClasses from "@/utilities/read-helper";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useEffectAfterMount from "@/hooks/useEffectAfterMount";
import { setField } from "@/redux/slices/userReadSetting/user-read-setting-slice";
import { Loader2 } from "lucide-react";

interface ImageContainerProps {
  containerRef: React.RefObject<HTMLDivElement>;
  currentImages: { id: string; path: string }[];
}

const ImageContainer: React.FC<ImageContainerProps> = ({ containerRef, currentImages }) => {
  const dispatch = useUserAppDispatch();
  const readSetting = useUserAppSelector(selectUserReadSetting);
  const readStyle = readingStyleClasses(readSetting.readingStyle.value);
  
  const observerTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastPageUpdateRef = useRef<number>(0);

  // Track visible page in long-strip mode for display purposes only
  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    if (readSetting.readingStyle.value === "long-strip" && currentImages.length > 0) {
      observer = new IntersectionObserver(
        (entries) => {
          const visibleEntries = entries.filter(entry => entry.isIntersecting);
          
          if (visibleEntries.length > 0) {
            const mostVisible = visibleEntries.reduce((max, current) => 
              current.intersectionRatio > max.intersectionRatio ? current : max
            );
            
            const currentImage = mostVisible.target as HTMLImageElement;
            const sid = currentImage.getAttribute("data-sid");
            const pageNumber = parseInt(sid as string);
            
            // Update display page without triggering other effects
            if (readSetting.currentPage !== pageNumber && 
                Date.now() - lastPageUpdateRef.current > 500) {
              
              if (observerTimeoutRef.current) {
                clearTimeout(observerTimeoutRef.current);
              }
              
              observerTimeoutRef.current = setTimeout(() => {
                lastPageUpdateRef.current = Date.now();
                // Only update for display purposes in the drawer
                dispatch(setField({ key: "currentPage", value: pageNumber }));
              }, 200);
            }
          }
        },
        { 
          root: null,
          threshold: [0.3, 0.5, 0.7],
          rootMargin: '0px'
        }
      );
      
      const timeoutId = setTimeout(() => {
        const imageElements = containerRef.current?.querySelectorAll("img");
        imageElements?.forEach((img) => observer?.observe(img));
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        if (observerTimeoutRef.current) {
          clearTimeout(observerTimeoutRef.current);
        }
        observer?.disconnect();
      };
    }
    return () => {
      if (observerTimeoutRef.current) {
        clearTimeout(observerTimeoutRef.current);
      }
      observer?.disconnect();
    };
  }, [dispatch, containerRef, readSetting.readingStyle.value, currentImages, readSetting.currentPage]);

  // Scroll to page when manually selected via progress bar in long-strip mode
  const scrollToPageRef = useRef(readSetting.currentPage);
  const userInitiatedScrollRef = useRef(false);
  
  const handleScrollToPage = useCallback(() => {
    if (userInitiatedScrollRef.current) {
      const imageElements = containerRef.current?.querySelectorAll("img");
      if (readSetting.readingStyle.value === "long-strip" && currentImages.length > 0) {
        const targetIndex = readSetting.currentPage - 1;
        imageElements?.[targetIndex]?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      userInitiatedScrollRef.current = false;
    }
  }, [containerRef, readSetting.readingStyle.value, readSetting.currentPage, currentImages]);
  
  useEffectAfterMount(() => {
    // Check if this is a user-initiated page change (not from IntersectionObserver)
    if (Math.abs(readSetting.currentPage - scrollToPageRef.current) > 1 || 
        scrollToPageRef.current !== readSetting.currentPage) {
      userInitiatedScrollRef.current = true;
      handleScrollToPage();
    }
    scrollToPageRef.current = readSetting.currentPage;
  }, [readSetting.currentPage, handleScrollToPage]);



  const LoadingPlaceholder = () => (
    <div className={`${readStyle.imageClass} ${readSetting.imageFit.value} flex items-center justify-center bg-gray-900/50 min-h-[600px]`}>
      <Loader2 className="h-12 w-12 animate-spin text-neon-primary" />
    </div>
  );

  return (
    <div className={`${readStyle.class} overscroll-y-scroll min-h-screen`} id="imageContainer" ref={containerRef}>
      {currentImages.map(({ id, path }, index) => (
        <LazyLoadImage 
          key={id} 
          src={path} 
          alt={id} 
          data-sid={index + 1}
          id="parentContainer"
          className={`${readStyle.imageClass} ${readSetting.imageFit.value} content-image`}
          placeholder={<LoadingPlaceholder />}
          effect="opacity"
        />
      ))}
    </div>
  );
};

export default ImageContainer;
