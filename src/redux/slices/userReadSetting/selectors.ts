import { UserRootState } from "@/redux/stores/userStore";
import { loadFromLocalStorage } from "./user-read-setting-slice";
import { initialState } from "./constants";


export const selectUserReadSetting = (state: UserRootState) => state.userReadSetting ?? loadFromLocalStorage("userReadSetting",initialState);
export const selectReadSettingPanel = (state: UserRootState) => state.userReadSetting.showPanel ?? loadFromLocalStorage("userReadSetting",initialState).showPanel;
export const selectHeaderVisible = (state: UserRootState) => state.userReadSetting.headerVisible ?? loadFromLocalStorage("userReadSetting",initialState).headerVisible;
