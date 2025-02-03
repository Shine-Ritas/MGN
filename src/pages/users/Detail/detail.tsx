import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useUserAppDispatch, useUserAppSelector } from "@/redux/hooks";
import { selectUserReadSetting } from "@/redux/slices/userReadSetting/selectors";
import { clearOutUserReadSetting, setCurrentPage, setField, toggleValue } from "@/redux/slices/userReadSetting/user-read-setting-slice";
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
import { getRandomInterval } from "@/utilities/util";
import FloatingToggle from "@/components/ui/floating-ball";

const images = import.meta.glob("@/assets/test/chapter-1/*.{png,jpg,jpeg,svg}", { eager: true }) as Record<string, { default: string }>;

const formattedImages = Object.keys(images).map((key) => ({
  id: key.split("/").pop()?.split(".")[0] || "",
  path: images[key].default,
}));


const prefetchImages = (imagePaths: string[]) => {
  imagePaths.forEach((path) => {
    const img = new Image();
    img.src = path;
  });
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

  const {isVisible,message,showAlert} = useTemporaryAlert();

  const [currentImages, setCurrentImages] = useState(formattedImages.slice(startIndex, endIndex));

  const shortcutMap = useMemo(() => shortcutMapFactory(dispatch,readSetting), [dispatch, readSetting]);

  const shortCutActions = shortcutActions(shortcutMap);

  useKeyboardShortcuts(shortCutActions);
  const { isMobile } = useScreenDetector();


  useEffect(() => {
    dispatch(setField({ key: "totalPages", value: formattedImages.length }));
    setCurrentImages(formattedImages.slice(startIndex, endIndex));

    const nextIndex = endIndex + 1;
    const prevIndex = Math.max(0, startIndex - max);
    const nextImages = formattedImages.slice(nextIndex, nextIndex + max).map(({ path }) => path);
    const prevImages = formattedImages.slice(prevIndex, prevIndex + max).map(({ path }) => path);

    prefetchImages([...nextImages, ...prevImages]);

  }, [readSetting, readStyle.max, currentPage, dispatch, endIndex, startIndex, max]);

  useEffect(()=>{
    if(isMobile)
    {
      const showAlertAtRandomInterval = () => {
        showAlert("Double click at center to toggle panel");

        const interval = getRandomInterval(5, 10);
        setTimeout(showAlertAtRandomInterval, interval);
      };
      showAlert("Double click at center to toggle panel");
      showAlertAtRandomInterval();

    }
  },[]);

  const handleScreenClick = useCallback(
    ({ clientX,clientY, currentTarget }: React.MouseEvent<HTMLDivElement>) => {

      if (readingStyle.value == "long-strip") {
        handleVerticalClick(containerRef,clientY, dispatch, currentPage);
        return;
      }

      handleHorizontalClick(currentTarget,clientX,readingDirection,dispatch);
    },
    [readingStyle.value, readingDirection, dispatch, currentPage]
  );

  const handlePageClick = useCallback((index: number) => {
    dispatch(setCurrentPage({ action: "prefer", index }));
  }, [dispatch]);

      const handleTogglePanel = useCallback(() => {
          dispatch(toggleValue("showPanel"));
      }, [dispatch]);

  return (
    <>
    <div className={`${readSetting.backgroundColor.value} cursor-pointer relative min-h-screen`}
      onClick={handleScreenClick}>
      <ImageContainer containerRef={containerRef} currentImages={currentImages} />
      <PageProgressBar
        className={"sticky bottom-[6px] left-0 " + readSetting.progressBar.value}
        totalPages={totalPages}
        onClick={handlePageClick}
        type={readSetting.progressBar.value}
      />

    </div>
      <SettingModal isOpen={readSetting.modalBox} shortCuts={shortcutMap}/>
     { isVisible &&<AlertComponent message={message} />}
     <FloatingToggle 
     isActive={readSetting.showPanel}
     onChange={handleTogglePanel} />

    </>
  );
};

export default Detail;
