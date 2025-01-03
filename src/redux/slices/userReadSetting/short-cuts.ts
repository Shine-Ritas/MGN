import { setCurrentPage, toggleValue } from "@/redux/slices/userReadSetting/user-read-setting-slice";
import { UserAppDispatch } from "@/redux/stores/userStore";

export interface Shortcut {
    key: string; // The shortcut key
    label: string;
    description: string; // Description of the action
    action: () => void; // The function to execute
}

const shortcutMapFactory = (dispatch: UserAppDispatch, readingDirection: string): Shortcut[] => {
    const LTR = readingDirection === "ltr";

    const nextAction = LTR ? "increase" : "decrease";
    const prevAction = LTR ? "decrease" : "increase";

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
    ];
};

const shortcutActions = (shortcuts: Shortcut[]) => {
    const actions: Record<string, () => void> = {};
    shortcuts.forEach((shortcut) => {
        actions[shortcut.key] = shortcut.action;
    });
    return actions;
};

export default shortcutMapFactory;
export { shortcutActions };
