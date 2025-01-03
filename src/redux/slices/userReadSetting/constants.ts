import { ReadingStyleType, HeaderVisibleType, ReadingDirectionType, ImageFitType, UserReadSetting, ProgressBarType } from "./types";

export const ReadingDirectionData: Record<string, ReadingDirectionType> = {
    LTR: {
        label: "Left to Right",
        value: "ltr",
        iconName: "PanelLeftOpen",
    },
    RTL: {
        label: "Right to Left",
        value: "rtl",
        iconName: "PanelRightOpen",
    },
};

export const ProgressBarData : Record<string, ProgressBarType> = {
    Hidden : {
        label: "No Progress",
        value: "hidden",
        iconName: "EyeOff",
    },
    Bar : {
        label: "Progress Bar",
        value: "sticky",
        iconName: "Minus",
    },
    LighterEffect:{
        label: "Progress Lighter Effect",
        value: "lighter-effect",
        iconName: "Rainbow",
    }
}

export const ReadingStyleData: Record<string, ReadingStyleType> = {
    DoublePage: {
        label: "Double Page",
        value: "double-page",
        iconName: "Layers2",
    },
    SinglePage: {
        label: "Single Page",
        value: "single-page",
        iconName: "Layers2",
    },
    LongStrip: {
        label: "Long Strip",
        value: "long-strip",
        iconName: "Layers2",
    },
};

export const HeaderVisibleData: Record<string, HeaderVisibleType> = {
    Sticky: {
        label: "Header Sticky",
        value: "top-0",
        iconName: "Layers2",
    },
    Hidden: {
        label: "No Header   ",
        value: "-top-40 hidden",
        iconName: "SendToBack",
    },
};


export const ImageFitData : Record<string, ImageFitType> = {
    Contain: {
        label: "Image-Fit: Contain",
        value: "object-contain h-screen md:max-h-screen md:w-auto",
        iconName: "ImageMinus", 
    },
    Cover: {
        label: "Image-Fit: Cover",
        value: "object-cover w-full",
        iconName: "RotateCwSquare",
    },
    Fill: {
        label: "Image-Fit: Fill",
        value: "object-fill",
        iconName:"GalleryThumbnails"
    }
}


// Initial state
export const initialState  :UserReadSetting = {
    currentPage: 1,
    totalPages : 1,
    currentChapter: 1,
    totalChapters : [],
    showPanel: false,
    modalBox:true,
    readingStyle: ReadingStyleData["SinglePage"],
    headerVisible: HeaderVisibleData["Sticky"],
    readingDirection: ReadingDirectionData["LTR"],
    imageFit: ImageFitData["Contain"],
    progressBar: ProgressBarData["Bar"],
};
