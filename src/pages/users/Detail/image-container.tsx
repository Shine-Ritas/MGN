import React, { useEffect, useRef, useCallback } from "react";
import { useUserAppDispatch, useUserAppSelector } from "@/redux/hooks";
import { setCurrentPage } from "@/redux/slices/userReadSetting/user-read-setting-slice";
import { selectUserReadSetting } from "@/redux/slices/userReadSetting/selectors";
import readingStyleClasses from "@/utilities/read-helper";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useEffectAfterMount from "@/hooks/useEffectAfterMount";

interface ImageContainerProps {
  containerRef: React.RefObject<HTMLDivElement>;
  currentImages: { id: string; path: string }[];
}

const ImageContainer: React.FC<ImageContainerProps> = ({ containerRef, currentImages }) => {
  const dispatch = useUserAppDispatch();
  const readSetting = useUserAppSelector(selectUserReadSetting);
  const readStyle = readingStyleClasses(readSetting.readingStyle.value);
  
  // Track user scrolling state to prevent auto-scroll interference
  const isUserScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastPageUpdateRef = useRef<number>(0);
  const observerTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle scroll events to detect user scrolling
  const handleScroll = useCallback(() => {
    isUserScrollingRef.current = true;
    
    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Set timeout to detect when scrolling stops
    scrollTimeoutRef.current = setTimeout(() => {
      isUserScrollingRef.current = false;
    }, 150); // 150ms after scrolling stops
  }, []);

  // Set up scroll listener for long-strip mode
  useEffect(() => {
    if (readSetting.readingStyle.value === "long-strip") {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        if (observerTimeoutRef.current) {
          clearTimeout(observerTimeoutRef.current);
        }
      };
    }
  }, [readSetting.readingStyle.value, handleScroll]);

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    if (readSetting.readingStyle.value === "long-strip" && currentImages.length > 0) {
      observer = new IntersectionObserver(
        (entries) => {
          // Find the most visible image
          const visibleEntries = entries.filter(entry => entry.isIntersecting);
          
          if (visibleEntries.length > 0) {
            // Sort by intersection ratio and pick the most visible one
            const mostVisible = visibleEntries.reduce((max, current) => 
              current.intersectionRatio > max.intersectionRatio ? current : max
            );
            
            const currentImage = mostVisible.target as HTMLImageElement;
            const sid = currentImage.getAttribute("data-sid");
            const pageNumber = parseInt(sid as string);
            
            // Only update if the page number is different from current page
            // and we're not in the middle of a programmatic page update
            if (readSetting.currentPage !== pageNumber && 
                Date.now() - lastPageUpdateRef.current > 1000) {
              
              // Clear existing timeout and debounce the update
              if (observerTimeoutRef.current) {
                clearTimeout(observerTimeoutRef.current);
              }
              
              observerTimeoutRef.current = setTimeout(() => {
                lastPageUpdateRef.current = Date.now();
                dispatch(setCurrentPage({ action: "prefer", index: pageNumber }));
              }, 300); // 300ms debounce
            }
          }
        },
        { 
          root: null, // Use viewport as root for better performance
          threshold: [0.3, 0.5, 0.7], // Multiple thresholds for better detection
          rootMargin: '0px' // Remove margin to be more precise
        }
      );
      
      // Wait for next tick to ensure images are rendered
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
  }, [dispatch, containerRef, readSetting.readingStyle.value, currentImages]);


  // Only scroll to page on initial load, not when page updates from scrolling
  useEffectAfterMount(() => {
    const imageElements = containerRef.current?.querySelectorAll("img");
    if (readSetting.readingStyle.value === "long-strip" && currentImages.length > 0) {
      // Use currentPage - 1 because array is 0-indexed but currentPage is 1-indexed
      const targetIndex = readSetting.currentPage - 1;
      // Only auto-scroll if it's not from a recent IntersectionObserver update
      // and user is not currently scrolling (i.e., only on manual page selection)
      if (!isUserScrollingRef.current && 
          Date.now() - lastPageUpdateRef.current > 2000) {
        imageElements?.[targetIndex]?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [readSetting.currentPage, readSetting.readingStyle.value, currentImages]);



  return (
    <div className={`${readStyle.class} overscroll-y-scroll min-h-screen`} id="imageContainer" ref={containerRef}>
      {currentImages.map(({ id, path }, index) => (
        <LazyLoadImage key={id} src={path} alt={id} data-sid={index + 1}
        id="parentContainer"
        className={`${readStyle.imageClass} ${readSetting.imageFit.value} content-image`} />
      ))}
    </div>
  );
};

export default ImageContainer;
