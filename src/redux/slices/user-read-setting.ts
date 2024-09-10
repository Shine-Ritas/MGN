import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { UserRootState } from "../stores/userStore";


type ReadingStyleType = "double-page" | "single-page" | "long-strip" ;

type HeaderVisibleType = {
    label : string;
    value : string;
}

type UserReadSetting = {
    showPanel : boolean;
    readingStyle: ReadingStyleType;
    headerVisible: HeaderVisibleType;
};

const initialState : UserReadSetting = {
    showPanel: false,
    readingStyle: "long-strip",
    headerVisible: {
        label: "Sticky",
        value: "top-0"
    },
};

export const userReadSettingSlice = createSlice({
    name : "userReadSetting",
    initialState,
    reducers: {
        setUserReadSetting(state, action: PayloadAction<UserReadSetting>) {
            state = action.payload;
        },
        setReadingStyle(state, action: PayloadAction<ReadingStyleType>) {
            state.readingStyle = action.payload;
        },
        toggleHeaderVisible(state) {
            state.headerVisible = state.headerVisible.label == "Sticky" ? {
                label: "Hidden",
                value: "-top-40 hidden"
            } : {
                label: "Sticky",
                value: "top-0"
            };
        },
        togglePanel(state) {
            state.showPanel = !state.showPanel;
        }
    }
});

export const {setReadingStyle, toggleHeaderVisible,togglePanel,setUserReadSetting} = userReadSettingSlice.actions;
export default userReadSettingSlice.reducer;
export type UserReadSettingRootState = ReturnType<typeof userReadSettingSlice.reducer>;

// get the whole state
export const selectUserReadSetting = (state: UserRootState) => state.userReadSetting;
export const selectReadSettingPanel = (state: UserRootState) => state.userReadSetting.showPanel;
export const selectHeaderVisible = (state: UserRootState) => state.userReadSetting.headerVisible;