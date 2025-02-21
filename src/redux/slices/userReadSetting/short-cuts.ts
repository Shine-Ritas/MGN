import { setCurrentPage, toggleValue } from "@/redux/slices/userReadSetting/user-read-setting-slice";
import { UserAppDispatch } from "@/redux/stores/userStore";
import { UserReadSetting } from "./types";

export interface Shortcut {
    key: string; // The shortcut key
    label: string;
    description: string; // Description of the action
    action: () => void; // The function to execute
}

// Utility function for scrolling
const scrollContainer = (amount: number) => {
    const container = document.querySelector("#imageContainer");
    if (container) {
        container.scrollBy({ top: amount, behavior: "smooth" });
    }
};

// Utility function for handling "w" action (scroll up)
const scrollUpForReadingStyle = (readingStyle: string,isDown : boolean) => {
    const container = document.querySelector("#imageContainer");
    if (!container) return;

    if (readingStyle.includes("long-strip")) {
        const amount = isDown ? 500 : -500;
        scrollContainer(amount); // Scroll up by 500px
    } else {
        const block = isDown ? "end" : "start";
        container.scrollIntoView({ behavior: "smooth", block }); // Go to the top
    }
};

const shortcutMapFactory = (dispatch: UserAppDispatch, readSetting: UserReadSetting): Shortcut[] => {
    const LTR = readSetting.readingDirection.value === "ltr";
    const ReadingStyle = readSetting.readingStyle.value;

    const nextAction = LTR ? "decrease" : "increase";
    const prevAction = LTR ? "increase" : "decrease";

    return [
        {
            key: "a",
            label: "a",
            description: "Skip a page, backward in LTR or forward in RTL.",
            action: () => dispatch(setCurrentPage({ action: nextAction })),
        },
        {
            key: "d",
            label: "d",
            description: "Skip a page, forward in LTR or backward in RTL",
            action: () => dispatch(setCurrentPage({ action: prevAction })),
        },
        {
            key: "arrowright",
            label: "→",
            description: "Skip a page, forward in LTR or backward in RTL",
            action: () => dispatch(setCurrentPage({ action: nextAction })),
        },
        {
            key: "arrowleft",
            label: "←",
            description: "Skip a page, backward in LTR or forward in RTL.",
            action: () => dispatch(setCurrentPage({ action: prevAction })),
        },
        {
            key: "h",
            label: "h",
            description: "Show/Hide Header",
            action: () => dispatch(toggleValue("headerVisible")),
        },
        {
            key: "p",
            label: "p",
            description: "Toggle the settings panel",
            action: () => dispatch(toggleValue("showPanel")),
        },
        {
            key: "w",
            label: "w",
            description: "Scroll up a little bit",
            action: () => scrollUpForReadingStyle(ReadingStyle,false),
        },
        {
            key: "s",
            label: "s",
            description: "Scroll a little bit down",
            action: () => scrollUpForReadingStyle(ReadingStyle,true),
        },
    ];
};

const shortcutActions = (shortcuts: Shortcut[]) => {
    return shortcuts.reduce<Record<string, () => void>>((acc, shortcut) => {
        acc[shortcut.key] = shortcut.action;
        return acc;
    }, {});
};

export default shortcutMapFactory;
export { shortcutActions };
