import React, { useRef, useCallback } from "react";
import { useUserAppSelector } from "@/redux/hooks";
import { selectUserReadSetting } from "@/redux/slices/userReadSetting/selectors";
import readingStyleClasses from "@/utilities/read-helper";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useEffectAfterMount from "@/hooks/useEffectAfterMount";
import { Loader2 } from "lucide-react";
import { useMagnifier } from "@/hooks/useMagnifier";

interface ImageContainerProps {
  containerRef: React.RefObject<HTMLDivElement>;
  currentImages: { id: string; path: string }[];
}

const ImageContainer: React.FC<ImageContainerProps> = ({ containerRef, currentImages }) => {
  const readSetting = useUserAppSelector(selectUserReadSetting);
  const readStyle = readingStyleClasses(readSetting.readingStyle.value);

  // Scroll to page when manually selected via progress bar in long-strip mode
  const scrollToPageRef = useRef(readSetting.currentPage);
  const userInitiatedScrollRef = useRef(false);
  const {
    lensVisible,
    lensBackground,
    lensPosition,
    lensDiameter,
    lensElRef,
    handlers,
  } = useMagnifier({ lensDiameter: 140, lensZoom: .9, longPressDelayMs: 250, offsetY: 140, stickToInitialImage: true });
  
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
    <div className={`${readStyle.imageClass} ${readSetting.imageFit.value} flex items-center justify-center  min-h-[400px] w-full`}>
      <Loader2 className="h-12 w-12 animate-spin text-neon-primary" />
    </div>
  );

  // Note: magnifier is managed by the hook via pointer events

  return (
    <div
      className={`${readStyle.class} overscroll-y-scroll `}
      id="imageContainer"
      ref={containerRef}
      onPointerDown={handlers.onPointerDown}
      onPointerMove={handlers.onPointerMove}
      onPointerUp={handlers.onPointerUp}
      onPointerCancel={handlers.onPointerCancel}
      onPointerLeave={handlers.onPointerLeave}
      onTouchStart={handlers.onTouchStart}
      onTouchMove={handlers.onTouchMove}
      onTouchEnd={handlers.onTouchEnd}
      onTouchCancel={handlers.onTouchCancel}
      onContextMenu={(e) => e.preventDefault()}
      // allow normal scroll when not active; disable while active to keep pointer events smooth
      style={{
        touchAction: lensVisible ? "none" : "auto",
        overscrollBehavior: lensVisible ? "contain" : undefined,
        userSelect: "none",
        WebkitTouchCallout: "none" as any,
        WebkitUserSelect: "none" as any,
      }}
    >
      {currentImages.map(({ id, path }, index) => (
        <LazyLoadImage 
          key={id} 
          src={path} 
          alt={id} 
          data-sid={index + 1}
          id="parentContainer"
          wrapperClassName="!flex justify-center "
          className={`${readStyle.imageClass} ${readSetting.imageFit.value} content-image`}
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          onPointerDown={handlers.onPointerDownImage}
          onTouchStart={handlers.onTouchStartImage}
          style={{ userSelect: "none", WebkitTouchCallout: "none" as any }}
          onLoad={() => {
            return <LoadingPlaceholder />
          }}
          effect="opacity"

        />
      ))}
      {lensVisible && lensBackground && (
        <div
          ref={lensElRef}
          aria-hidden
          className="pointer-events-none fixed z-50 rounded-full shadow-xl ring-2 ring-white/70 will-change-transform"
          style={{
            left: 0,
            top: 0,
            width: `${lensDiameter}px`,
            height: `${lensDiameter}px`,
            transform: `translate3d(${lensPosition.x}px, ${lensPosition.y}px, 0)`,
            backgroundImage: `url(${lensBackground.image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${lensBackground.size.w}px ${lensBackground.size.h}px`,
            backgroundPosition: `${lensBackground.position.x}px ${lensBackground.position.y}px`,
            boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
          }}
        />
      )}
    </div>
  );
};

export default ImageContainer;
