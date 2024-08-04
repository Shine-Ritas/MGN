import { RootState } from './../store';
import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface UserGlobal {
    isAuth: boolean;
    user: null | {
        id: string;
        email: string;
        username: string;
        role: string;
    };
    safeContent: boolean;
}

const initialState: UserGlobal = {
    isAuth: false,
    user: null,
    safeContent: localStorage.getItem('safeContent') == 'false' ? false : true
};

export const userGlobalSlice = createSlice({
    name: "userGlobal",
    initialState,
    reducers: {
        setAuth(state, action) {
            state.isAuth = action.payload;
        },
        setUser(state, action) {
            state.user = action.payload;
        },
        setSafeContent(state, action: PayloadAction<boolean>) {
            state.safeContent = action.payload;
        },
    },
});


export const { setAuth, setUser, setSafeContent } = userGlobalSlice.actions;
export default userGlobalSlice.reducer;
export const selectSafeContent = (state : RootState) => state.userGlobal.safeContent;