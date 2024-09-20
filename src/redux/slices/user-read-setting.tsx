import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserRootState } from "../stores/userStore";
import { Layers2, PanelLeftOpen, PanelRightOpen, SendToBack } from "lucide-react";

// Types for better clarity and reusability
interface OptionType {
  label: string;
  value: string;
  iconName?: string;
}

type ReadingStyleType = OptionType;
type HeaderVisibleType = OptionType;
type ReadingDirectionType = OptionType;

interface UserReadSetting {
  showPanel: boolean;
  readingStyle: ReadingStyleType;
  headerVisible: HeaderVisibleType;
  readingDirection: ReadingDirectionType;
}

const ReadingDirectionData: Record<string, ReadingDirectionType> = {
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

const ReadingStyleData: Record<string, ReadingStyleType> = {
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

const HeaderVisibleData: Record<string, HeaderVisibleType> = {
  Sticky: {
    label: "Sticky",
    value: "top-0",
    iconName: "Layers2",
  },
  Hidden: {
    label: "Hidden",
    value: "-top-40 hidden",
    iconName: "SendToBack",
  },
};


// Initial state
const initialState: UserReadSetting = {
  showPanel: false,
  readingStyle: ReadingStyleData["SinglePage"],
  headerVisible: HeaderVisibleData["Sticky"],
  readingDirection: ReadingDirectionData["LTR"],
};

// Slice definition
export const userReadSettingSlice = createSlice({
  name: "userReadSetting",
  initialState,
  reducers: {
    setUserReadSetting(state, action: PayloadAction<UserReadSetting>) {
      return action.payload; // Direct state replacement for full object
    },
    setReadingStyle(state, action: PayloadAction<ReadingStyleType>) {
      state.readingStyle = action.payload;
    },
    toggleHeaderVisible(state) {
      state.headerVisible =
        state.headerVisible.label === "Sticky"
          ? HeaderVisibleData["Hidden"]
          : HeaderVisibleData["Sticky"];
    },
    togglePanel(state) {
      state.showPanel = !state.showPanel;
    },
    toggleReadPageStyle(state) {
      const currentStyleKey = Object.keys(ReadingStyleData).find(
        (key) => ReadingStyleData[key].value === state.readingStyle.value
      );
      const keys = Object.keys(ReadingStyleData);
      const nextIndex = (keys.indexOf(currentStyleKey!) + 1) % keys.length;
      state.readingStyle = ReadingStyleData[keys[nextIndex]];
    },
    toggleReadingDirection(state) {
      const currentDirectionKey = Object.keys(ReadingDirectionData).find(
        (key) => ReadingDirectionData[key].value === state.readingDirection.value
      );
      const keys = Object.keys(ReadingDirectionData);
      const nextIndex = (keys.indexOf(currentDirectionKey!) + 1) % keys.length;
      state.readingDirection = ReadingDirectionData[keys[nextIndex]];
    },
  },
});

// Actions
export const {
  setReadingStyle,
  toggleHeaderVisible,
  togglePanel,
  setUserReadSetting,
  toggleReadPageStyle,
  toggleReadingDirection,
} = userReadSettingSlice.actions;

// Reducer export
export default userReadSettingSlice.reducer;

// Selectors
export const selectUserReadSetting = (state: UserRootState) => state.userReadSetting;
export const selectReadSettingPanel = (state: UserRootState) => state.userReadSetting.showPanel;
export const selectHeaderVisible = (state: UserRootState) => state.userReadSetting.headerVisible;
