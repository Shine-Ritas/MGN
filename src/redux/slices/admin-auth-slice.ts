import { AdminType } from "@/types/auth";
import { createSlice } from "@reduxjs/toolkit";


interface AdminInitialState {
    admin?: null | AdminType,
}

const initialState: AdminInitialState = {
    admin: null,
};

const adminAuthSlice = createSlice({
    name: "adminAuth",
    initialState,
    reducers: {
        setAdmin(state, action) {
            state.admin = action.payload;
        },
        adminLogout(state) {
            state.admin = null;
        }
    }
});

export const { setAdmin, adminLogout } = adminAuthSlice.actions;

export default adminAuthSlice.reducer;

export const adminAuthSelector = (state: { adminAuth: AdminInitialState }) => state.adminAuth;