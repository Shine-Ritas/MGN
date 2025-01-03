/* eslint-disable react-refresh/only-export-components */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState, ReadingStyleData, ReadingDirectionData, HeaderVisibleData, ImageFitData, ProgressBarData } from "./constants";
import { UserReadSetting } from "./types";
import readingStyleClasses from "@/utilities/read-helper";

// Utility for persisting to localStorage
const saveToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const loadFromLocalStorage = (key: string, fallback: any): any => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : fallback;
};


const getRotationKey = (collection: Record<string, any>, current: any) => {
  const keys = Object.keys(collection);
  const currentIndex = keys.indexOf(
    Object.keys(collection).find((key) => collection[key].value === current.value)!
  );
  return keys[(currentIndex + 1) % keys.length];
};
  
const persistedState = loadFromLocalStorage(
  "userReadSetting",
  initialState
);

const updateStateAndPersist = <T extends keyof UserReadSetting>(
  state: UserReadSetting,
  key: T,
  value: UserReadSetting[T]
) => {
  state[key] = value;
  saveToLocalStorage("userReadSetting", state);
};


export const userReadSettingSlice = createSlice({
  name: "userReadSetting",
  initialState: persistedState,
  reducers: {
    setUserReadSetting: (state, { payload }: PayloadAction<UserReadSetting>) => {
      saveToLocalStorage("userReadSetting", payload);
      return payload;
    },
    clearOutUserReadSetting: () => {
      localStorage.removeItem("userReadSetting");
      return initialState;
    },
    toggleValue: (state, { payload: key }: PayloadAction<keyof UserReadSetting>) => {
      const collection = {
        readingStyle: ReadingStyleData,
        readingDirection: ReadingDirectionData,
        headerVisible: HeaderVisibleData,
        imageFit: ImageFitData,
        progressBar : ProgressBarData
      }[key];
      if (collection) { 
        const nextKey = getRotationKey(collection, state[key]);
        updateStateAndPersist(state, key, collection[nextKey]);
      }else{
        updateStateAndPersist(state, key, !state[key]);
      }
    },
    setCurrentPage: (state, { payload }: PayloadAction<{ action: string; index?: number }>) => {
      const { action, index } = payload;
    
      const { max } = readingStyleClasses(state.readingStyle.value);
      const totalPages = state.totalPages || 0;

      let newPage = state.currentPage as number;
      if (action === "prefer" && index !== undefined) newPage = index
      else if (action === "increase") newPage = newPage + max < totalPages ? newPage + max : totalPages;
      else if (action === "decrease") newPage = newPage - max > 0 ? newPage - max : 1;

      updateStateAndPersist(state, "currentPage", newPage);
    },
    setField: <T extends keyof UserReadSetting>(
      state: UserReadSetting,
      { payload }: PayloadAction<{ key: T; value: UserReadSetting[T] }>
    ) => {
      updateStateAndPersist(state, payload.key, payload.value);
    },
  },
});


export const { setUserReadSetting, toggleValue, setCurrentPage, setField,clearOutUserReadSetting } = userReadSettingSlice.actions;
export default userReadSettingSlice.reducer;