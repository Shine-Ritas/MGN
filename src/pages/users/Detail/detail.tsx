import React, { useCallback, useEffect, useState } from "react";
import { useUserAppDispatch, useUserAppSelector } from "@/redux/hooks";
import { selectUserReadSetting } from "@/redux/slices/userReadSetting/selectors";
import { setCurrentPage, setField, toggleValue } from "@/redux/slices/userReadSetting/user-read-setting-slice";
import readingStyleClasses from "@/utilities/read-helper";
import { PageProgressBar } from "./page-progress";

const images = import.meta.glob("@/assets/test/chapter-1/*.{png,jpg,jpeg,svg}", { eager: true }) as Record<string, { default: string }>;

const formattedImages = Object.keys(images).map((key) => ({
  id: key.split("/").pop()?.split(".")[0] || "",
  path: images[key].default,
}));

let lastTapTime = 0;

const prefetchImages = (imagePaths: string[]) => {
  imagePaths.forEach((path) => {
    const img = new Image();
    img.src = path;
  });
};

const Detail = () => {
  const [currentImages, setCurrentImages] = useState(formattedImages.slice(0, 2));
  const readSetting = useUserAppSelector(selectUserReadSetting);
  const dispatch = useUserAppDispatch();

  const { currentPage, totalPages, readingStyle, readingDirection } = readSetting;
  const readStyle = readingStyleClasses(readingStyle.value);

  useEffect(() => {
    const max = readStyle.max;
    const startIndex = currentPage * max - max;
    const endIndex = Math.min(formattedImages.length, startIndex + max);

    dispatch(setField({ key: "totalPages", value: formattedImages.length }));
    setCurrentImages(formattedImages.slice(startIndex, endIndex));

    const nextIndex = endIndex;
    const prevIndex = Math.max(0, startIndex - max);
    const nextImages = formattedImages.slice(nextIndex, nextIndex + max).map(({ path }) => path);
    const prevImages = formattedImages.slice(prevIndex, prevIndex + max).map(({ path }) => path);

    prefetchImages([...nextImages, ...prevImages]);
  }, [readSetting, readStyle.max, currentPage, dispatch]);

  const handleScreenClick = useCallback(
    ({ clientX, currentTarget }: React.MouseEvent<HTMLDivElement>) => {
      const { offsetWidth } = currentTarget;
      const middle = offsetWidth / 2;
      const tolerance = offsetWidth * 0.1;

      const doubleTapTimeout = 500;
      const isLTR = readingDirection.value === "ltr";

      const currentTime = Date.now();

      if (currentTime - lastTapTime <= doubleTapTimeout && clientX > middle - tolerance && clientX < middle + tolerance) {
        dispatch(toggleValue("showPanel")); 
        lastTapTime = 0;
        return;
      }

      lastTapTime = currentTime;

      if (clientX > middle + tolerance) isLTR ? dispatch(setCurrentPage({ action: "increase" })) : dispatch(setCurrentPage({ action: "decrease" }));
      else if (clientX < middle - tolerance) isLTR ? dispatch(setCurrentPage({ action: "decrease" })) : dispatch(setCurrentPage({ action: "increase" }));
    },
    [dispatch, readingDirection.value, lastTapTime]
  );

  const handlePageClick = useCallback((index: number) => {
    dispatch(setCurrentPage({ action: "prefer", index }));
  }, [dispatch]);

  return (
    <div className="bg-slate-700 cursor-pointer relative" onClick={handleScreenClick}>
      <div className={readStyle.class}>
        {currentImages.map(({ id, path }) => (
          <img key={id} src={path} alt={id} className={`${readStyle.imageClass} ${readSetting.imageFit.value}`} />
        ))}
      </div>
      <PageProgressBar
        className={"absolute bottom-[6px] left-0 " + readSetting.progressBar.value}
        currentPage={currentPage}
        totalPages={totalPages}
        onClick={handlePageClick}
      />
    </div>
  );
};

export default Detail;
