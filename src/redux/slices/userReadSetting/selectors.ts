import { UserRootState } from "@/redux/stores/userStore";


export const selectUserReadSetting = (state: UserRootState) => state.userReadSetting;
export const selectReadSettingPanel = (state: UserRootState) => state.userReadSetting.showPanel;
export const selectHeaderVisible = (state: UserRootState) => state.userReadSetting.headerVisible;
