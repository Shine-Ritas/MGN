import { MogouChapter } from "@/pages/admin/Comics/type";
import { SubMogousType } from "@/pages/users/home/types";
import {
  setSubscriptionModalData,
  setSubscriptionModalOpen,
} from "@/redux/slices/user-global";
import { UserAppDispatch } from "@/redux/stores/userStore";
import { NavigateFunction } from "react-router-dom";

type ReadSettingReturnType = {
  class: string;
  imageClass: string;
  max: number;
};

const readingStyleClasses = (type: string): ReadSettingReturnType => {
  switch (type) {
    case "double-page":
      return {
        class: "flex justify-center gap-1 overflow-scroll", // Centers the images and adds a small gap
        imageClass: "shadow-2xl max-h-screen w-1/2", // Ensures full height without distorting width
        max: 2,
      };
    case "single-page":
      return {
        class: "flex flex-col items-center gap-2",
        imageClass: "rounded shadow-md ", // Full height with centered content
        max: 1,
      };
    case "long-strip":
      return {
        class:
          "flex flex-col items-center gap-1 max-h-screen overflow-y-scroll",
        imageClass: "w-4/5 h-auto", // Long strip with consistent width
        max: 100,
      };
    default:
      return {
        class: "flex flex-col gap-4",
        imageClass: "",
        max: 2,
      };
  }
};

export default readingStyleClasses;

export const handleRead = (
  dispatch: UserAppDispatch,
  userCanReadAll: boolean,
  navigate: NavigateFunction,
  chapter: MogouChapter | SubMogousType,
  mogou_slug: string,
) => {
  const link = `/read/mogou/${mogou_slug}/chapters/${chapter.slug}`;

  // First, check if third-party redirect exists and user is not allowed to read all
  if (chapter?.third_party_redirect && !userCanReadAll) {
    window.location.href = chapter.third_party_url!;
    return;
  }
  // Next, check if subscription is required and user is not allowed to read all
  if (chapter.subscription_only && !userCanReadAll) {
    dispatch(setSubscriptionModalOpen(true));
    dispatch(
      setSubscriptionModalData({
        title: chapter.title,
        description: chapter.description,
      }),
    );
    return;
  }

  // Otherwise, navigate normally
  navigate(link);
};
