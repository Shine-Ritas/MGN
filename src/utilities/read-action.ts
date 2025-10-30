import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { setCurrentPage, toggleValue } from "@/redux/slices/userReadSetting/user-read-setting-slice";
import React from "react";
import { NavigateFunction } from "react-router-dom";

// Define an explicit type for reading direction.
export type ReadingDirection = "ltr" | "rtl";

// Module-scoped variable to track the last tap time.
let lastTapTime = 0;

interface SetCurrentPagePayload {
  action: "increase" | "decrease" | "prefer";
  index?: number;
}

const doubleTapTimeout = 300;

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
  dispatch: Dispatch<UnknownAction>,
  navigate: NavigateFunction
): void => {
  const { offsetWidth } = currentTarget;
  const middle = offsetWidth / 2;
  const tolerance = offsetWidth * 0.2;
  const isLTR = readingDirection.value === "ltr";
  const currentTime = Date.now();

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
    dispatch(setCurrentPage({ action: isLTR ? "increase" : "decrease" , navigate } as SetCurrentPagePayload));
  } else if (clientX < middle - tolerance) {
    // For LTR reading, move backward; for RTL, move forward.
    dispatch(setCurrentPage({ action: isLTR ? "decrease" : "increase" , navigate } as SetCurrentPagePayload));
  }
};

/**
 * Handles vertical click events to scroll to the next or previous image in long-strip mode.
 *
 * @param containerRef - A reference to the container element holding images.
 * @param clientY - The vertical coordinate (clientY) of the click.
 * @param dispatch - The Redux dispatch function.
 * @param currentPage - The current page (index) value (unused but kept for compatibility).
 */
export const handleVerticalClick = (
  containerRef: React.RefObject<HTMLDivElement>,
  clientY: number,
  dispatch: Dispatch<UnknownAction>,
  currentPage: number,
): void => {
  const container = containerRef.current;
  if (!container) return;

  const currentTime = Date.now();
  const viewportHeight = window.innerHeight;
  const middleThreshold = viewportHeight / 2;

  // Check for double tap to toggle the panel (anywhere on screen)
  if (currentTime - lastTapTime <= doubleTapTimeout) {
    dispatch(toggleValue("showPanel"));
    lastTapTime = 0;
    return;
  }

  lastTapTime = currentTime;

  // Scroll a small amount instead of jumping between images
  const scrollAmount = Math.max(100, Math.round(viewportHeight * 0.9));

  // Prefer scrolling the container if it is scrollable; fallback to window
  const canScrollContainer = container.scrollHeight > container.clientHeight;

  if (clientY > middleThreshold) {
    if (canScrollContainer) {
      container.scrollBy({ top: scrollAmount, behavior: "smooth" });
    } else {
      window.scrollBy({ top: scrollAmount, behavior: "smooth" });
    }
  } else {
    if (canScrollContainer) {
      container.scrollBy({ top: -scrollAmount, behavior: "smooth" });
    } else {
      window.scrollBy({ top: -scrollAmount, behavior: "smooth" });
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