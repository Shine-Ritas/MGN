import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { setCurrentPage, toggleValue } from "@/redux/slices/userReadSetting/user-read-setting-slice";
import React from "react";

// Define an explicit type for reading direction.
export type ReadingDirection = "ltr" | "rtl";

// Module-scoped variable to track the last tap time.
let lastTapTime = 0;

interface SetCurrentPagePayload {
  action: "increase" | "decrease" | "prefer";
  index?: number;
}

const currentTime = Date.now();
const doubleTapTimeout = 500;

/**
 * Handles horizontal click events for navigating pages or toggling a panel.
 *
 * @param currentTarget - The element that received the click event.
 * @param clientX - The horizontal coordinate (clientX) of the click.
 * @param readingDirection - The reading direction ("ltr" or "rtl").
 * @param dispatch - The Redux dispatch function.
 */
export const handleHorizontalClick = (
  currentTarget: HTMLElement,
  clientX: number,
  readingDirection: { value: ReadingDirection },
  dispatch: Dispatch<UnknownAction>
): void => {
  const { offsetWidth } = currentTarget;
  const middle = offsetWidth / 2;
  const tolerance = offsetWidth * 0.2;
  const isLTR = readingDirection.value === "ltr";

  // Check for a double tap at the center region to toggle the panel.
  if (
    currentTime - lastTapTime <= doubleTapTimeout &&
    clientX > middle - tolerance &&
    clientX < middle + tolerance
  ) {
    dispatch(toggleValue("showPanel"));
    lastTapTime = 0;
    return;
  }

  lastTapTime = currentTime;

  // Determine navigation action based on click position.
  if (clientX > middle + tolerance) {
    // For LTR reading, move forward; for RTL, move backward.
    dispatch(setCurrentPage({ action: isLTR ? "increase" : "decrease" } as SetCurrentPagePayload));
  } else if (clientX < middle - tolerance) {
    // For LTR reading, move backward; for RTL, move forward.
    dispatch(setCurrentPage({ action: isLTR ? "decrease" : "increase" } as SetCurrentPagePayload));
  }
};

/**
 * Handles vertical click events to scroll to the next image.
 *
 * @param containerRef - A reference to the container element holding images.
 * @param dispatch - The Redux dispatch function.
 * @param currentPage - The current page (index) value.
 */
export const handleVerticalClick = (
  containerRef: React.RefObject<HTMLDivElement>,
  clientY: number,
  dispatch: Dispatch<UnknownAction>,
  currentPage: number
): void => {
  const container = containerRef.current;
  if (!container) return;

  const { offsetHeight } = containerRef.current;
  const middle = offsetHeight / 2;


  if (currentTime - lastTapTime <= doubleTapTimeout) {
    dispatch(toggleValue("showPanel"));
    lastTapTime = 0;
    console.log('here')
    return;
  }

  const images = Array.from(container.querySelectorAll("img")) as HTMLImageElement[];

  if (clientY > middle) {
    console.log('under middle')
    const nextImage = images[currentPage] || images[currentPage - 1];

    if (nextImage) {
      nextImage.scrollIntoView({ behavior: "smooth", block: "start" });
      dispatch(setCurrentPage({ action: "prefer", index: currentPage + 1 } as SetCurrentPagePayload));
    }
  }
  else {
    const prevImage = images[currentPage - 2] ;

    if (prevImage) {
      prevImage.scrollIntoView({ behavior: "smooth", block: "start" });

      dispatch(setCurrentPage({ action: "prefer", index: currentPage - 3 } as SetCurrentPagePayload));
    }
  }

};


const invalidKeyForMobile = ['DoublePage'];


export const filterForDevices = ( collection ) => {
  
  const currentDevice = localStorage.getItem('currentDevice') || 'desktop';

  if(currentDevice === 'mobile'){
    return collection.filter((key: string) => !invalidKeyForMobile.includes(key));
  }

  return collection;
}