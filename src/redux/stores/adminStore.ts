import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { sharedMiddleware, sharedReducers } from "./sharedStore";
import adminAuthSlice from "../slices/admin-auth-slice";
import { adminPermissionSlice } from "../slices/admin-permission-slice";

export const adminStore = configureStore({
    reducer: {
        ...sharedReducers,
        adminAuth: adminAuthSlice,
        adminPermissions: adminPermissionSlice.reducer
    },
    middleware: getDefaultMiddleware =>   sharedMiddleware(getDefaultMiddleware).concat(thunk)
});

export type AdminRootState = ReturnType<typeof adminStore.getState>; // Typing the user store
export type AdminAppDispatch = typeof adminStore.dispatch;