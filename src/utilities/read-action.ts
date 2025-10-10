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
 * Finds the currently most visible image in the viewport.
 */
const findCurrentlyVisibleImage = (images: HTMLImageElement[]): number => {
  const viewportMiddle = window.innerHeight / 2 + window.scrollY;
  let closestIndex = 0;
  let closestDistance = Infinity;

  images.forEach((img, index) => {
    const rect = img.getBoundingClientRect();
    const imgMiddle = rect.top + window.scrollY + rect.height / 2;
    const distance = Math.abs(imgMiddle - viewportMiddle);
    
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  return closestIndex;
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

  const images = Array.from(container.querySelectorAll("img")) as HTMLImageElement[];
  if (images.length === 0) return;

  // Find the currently visible image based on viewport position
  const currentVisibleIndex = findCurrentlyVisibleImage(images);

  // Click on bottom half = go to next image
  if (clientY > middleThreshold) {
    const nextIndex = Math.min(currentVisibleIndex + 1, images.length - 1);
    const nextImage = images[nextIndex];
    if (nextImage) {
      nextImage.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  } 
  // Click on top half = go to previous image
  else {
    const prevIndex = Math.max(currentVisibleIndex - 1, 0);
    const prevImage = images[prevIndex];
    if (prevImage) {
      prevImage.scrollIntoView({ behavior: "smooth", block: "start" });
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