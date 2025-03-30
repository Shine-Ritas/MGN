/* eslint-disable react-refresh/only-export-components */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState, toggleActionCollection, SettingActionKey } from "./constants";
import { UserReadSetting } from "./types";
import readingStyleClasses from "@/utilities/read-helper";
import { filterForDevices } from "@/utilities/read-action";
import { validateUserReadSetting } from "./validation";
import { NavigateFunction } from "react-router-dom";

// Utility for persisting to localStorage
const saveToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadFromLocalStorage = (key: string, fallback: any): any => {
  const data = localStorage.getItem(key);
  if (!data) {
    saveToLocalStorage(key, fallback)
  }
  const parsedData = data ? JSON.parse(data) : fallback;
  return validateUserReadSetting(parsedData) ? parsedData : fallback;
};


const getRotationKey = (collection: Record<string, any>, current: any) => {
  // Get all keys from the collection
  const keys = Object.keys(collection);

  // Filter keys based on the device (mobile or desktop)
  const validatedKeys = filterForDevices(keys);

  // Find the current index in the validatedKeys array
  const currentIndex = validatedKeys.indexOf(
    validatedKeys.find((key) => collection[key].value === current.value)!
  );

  // Return the next key in a circular manner, using validatedKeys
  return validatedKeys[(currentIndex + 1) % validatedKeys.length];
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

export const handleChapterSwitch = (action: "prefer" | "next" | "prev", navigate) => {
  const state = loadFromLocalStorage("userReadSetting", initialState);
  let url = "";
  url = (action == "next") ? state.nextUrl : state.prevUrl;
  saveToLocalStorage("userReadSetting", state);
  navigate(url);
}



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
      const collection = toggleActionCollection[key];
      if (collection) {
        const nextKey = getRotationKey(collection, state[key]);
        updateStateAndPersist(state, key, collection[nextKey]);
      } else {
        updateStateAndPersist(state, key, !state[key]);
      }
    },
    setRotation: (state, { payload }: PayloadAction<{ key: SettingActionKey; value: keyof UserReadSetting }>) => {
      const { key, value } = payload;
      const collection = toggleActionCollection[key];
      updateStateAndPersist(state, `${key}`, collection[value]);
    },
    setCurrentPage: (state, { payload }: PayloadAction<{ action: string; index?: number; navigate?: NavigateFunction }>) => {
      const { action, index, navigate } = payload;
      const { max } = readingStyleClasses(state.readingStyle.value);
      const totalPages = state.totalPages || 0;
      let newPage = state.currentPage as number;

      switch (action) {
        case "prefer":
          if (index !== undefined) newPage = index;
          break;

        case "increase": {
          const nextPage = newPage + max;
          if (nextPage > totalPages && newPage === totalPages) {
            navigate!(state.nextUrl)
          }
          newPage = Math.min(nextPage, totalPages);
          break;
        }

        case "decrease": {
          const prevPage = newPage - max;
          if (prevPage < 1 && newPage === 1) {
            navigate!(state.prevUrl)
          }
          newPage = Math.max(prevPage, 1);
          break;
        }
      }

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


export const selectSettingByKey = (state: any, key: SettingActionKey) => state.userReadSetting[key];

export const { setUserReadSetting, toggleValue, setCurrentPage, setRotation, setField, clearOutUserReadSetting } = userReadSettingSlice.actions;
export default userReadSettingSlice.reducer;