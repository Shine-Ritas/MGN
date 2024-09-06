import { configureStore } from "@reduxjs/toolkit";
import { sharedMiddleware, sharedReducers } from "./sharedStore";
import adminAuthSlice from "../slices/admin-auth-slice";

export const adminStore = configureStore({
    reducer:{
        ...sharedReducers,
        adminAuth: adminAuthSlice,
    },
    middleware: sharedMiddleware
});


export type AdminRootState = ReturnType<typeof adminStore.getState>; // Typing the user store
export type AdminAppDispatch = typeof adminStore.dispatch;