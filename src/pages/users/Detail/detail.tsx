import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useUserAppDispatch, useUserAppSelector } from "@/redux/hooks";
import { selectUserReadSetting } from "@/redux/slices/userReadSetting/selectors";
import { setCurrentPage, setField, toggleValue } from "@/redux/slices/userReadSetting/user-read-setting-slice";
import readingStyleClasses from "@/utilities/read-helper";
import { PageProgressBar } from "./page-progress";
import ImageContainer from "./image-container";
import SettingsModal from "@/redux/slices/userReadSetting/setting-modal";
import shortcutMapFactory, { shortcutActions } from "@/redux/slices/userReadSetting/short-cuts";
import useKeyboardShortcuts from "@/hooks/useKeyboardShortcuts";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

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

const handleHorizontalClick = (currentTarget,clientX,readingDirection,dispatch) => {
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

}

const handleVerticalClick = (containerRef: React.RefObject<HTMLDivElement>, dispatch: Dispatch<UnknownAction>, currentPage: number) => {
  if (!containerRef.current) return;

  const container = containerRef.current;
  const images = Array.from(container.querySelectorAll("img")) as HTMLImageElement[];
  const nextImage = images[currentPage] || images[currentPage-1];

  console.log(nextImage,currentPage)
  if (nextImage) {
    nextImage.scrollIntoView({ behavior: "smooth", block: "start" });
    dispatch(setCurrentPage({ action: "prefer", index: currentPage++ }));
  }
};


const Detail = () => {
  const readSetting = useUserAppSelector(selectUserReadSetting);
  const dispatch = useUserAppDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const { currentPage, totalPages, readingStyle, readingDirection } = readSetting;
  const readStyle = readingStyleClasses(readingStyle.value);
  const max = readStyle.max;
  const startIndex = (max == 100) ? 0 : currentPage - 1; 
  const endIndex = Math.min(formattedImages.length, startIndex + max);

  const [currentImages, setCurrentImages] = useState(formattedImages.slice(startIndex, endIndex));

  const shortcutMap = useMemo(() => shortcutMapFactory(dispatch,readSetting), [dispatch, readSetting]);

  const shortCutActions = shortcutActions(shortcutMap);

  useKeyboardShortcuts(shortCutActions);

  useEffect(() => {
    dispatch(setField({ key: "totalPages", value: formattedImages.length }));
    setCurrentImages(formattedImages.slice(startIndex, endIndex));

    const nextIndex = endIndex + 1;
    const prevIndex = Math.max(0, startIndex - max);
    const nextImages = formattedImages.slice(nextIndex, nextIndex + max).map(({ path }) => path);
    const prevImages = formattedImages.slice(prevIndex, prevIndex + max).map(({ path }) => path);

    prefetchImages([...nextImages, ...prevImages]);
  }, [readSetting, readStyle.max, currentPage, dispatch, endIndex, startIndex, max]);

  const handleScreenClick = useCallback(
    ({ clientX, currentTarget }: React.MouseEvent<HTMLDivElement>) => {

      if (readingStyle.value == "long-strip") {
        handleVerticalClick(containerRef, dispatch, currentPage);
        return;
      }

      handleHorizontalClick(currentTarget,clientX,readingDirection,dispatch);
    },
    [readingStyle.value, readingDirection, dispatch, currentPage]
  );

  const handlePageClick = useCallback((index: number) => {
    dispatch(setCurrentPage({ action: "prefer", index }));
  }, [dispatch]);

  return (
    <>
    <div className="bg-slate-700 cursor-pointer relative min-h-screen"
      onClick={handleScreenClick}>
      <ImageContainer containerRef={containerRef} currentImages={currentImages} />
      <PageProgressBar
        className={"sticky bottom-[6px] left-0 " + readSetting.progressBar.value}
        totalPages={totalPages}
        onClick={handlePageClick}
        type={readSetting.progressBar.value}
      />
    </div>
      <SettingsModal isOpen={readSetting.modalBox} shortCuts={shortcutMap}/>
    </>
  );
};

export default Detail;
