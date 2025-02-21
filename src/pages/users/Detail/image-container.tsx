import React, { useEffect } from "react";
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


  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    if (readSetting.readingStyle.value === "long-strip") {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const currentImage = entry.target as HTMLImageElement;
              const sid = currentImage.getAttribute("data-sid");
              if(readSetting.currentPage !== sid )
              dispatch(setCurrentPage({ action: "prefer", index: parseInt(sid as string) }));
            }

          });
        },
        { root: containerRef.current, threshold: 0.95 } // 60% of the image must be visible
      );
      const imageElements = containerRef.current?.querySelectorAll("img");
      imageElements?.forEach((img) => observer?.observe(img));

    }
    return () => observer?.disconnect();
  }, [dispatch, containerRef, readSetting.readingStyle.value, readSetting.currentPage]);


  useEffectAfterMount(() => {
    const imageElements = containerRef.current?.querySelectorAll("img");
    if (readSetting.readingStyle.value === "long-strip") {
      imageElements?.[readSetting.currentPage]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);



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
