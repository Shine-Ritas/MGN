import { Banner } from '@/pages/admin/Settings/Banner/type';
import { UserRootState } from '../stores/userStore';
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
    subscription?: boolean;
    banners : Banner[];
    is_maintenance?: boolean;
}

const initialState: UserGlobal = {
    isAuth: false,
    user: null,
    safeContent: localStorage.getItem('safeContent') == 'false' ? false : true,
    subscription: false,
    banners : [],
    is_maintenance: localStorage.getItem('is_maintenance') == 'true' ? true : false
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
        setBanners(state, action: PayloadAction<Banner[]>) {
            // set only if user is not subscribed
            if(!state.subscription)
            {
                state.banners = action.payload;
            }
        },
        setMaintenance(state, action: PayloadAction<boolean>) {
            state.is_maintenance = action.payload;
            localStorage.setItem('is_maintenance', action.payload ? 'true' : 'false');
        }
    },
});


export const { setAuth, setUser, setSafeContent,setBanners,setMaintenance } = userGlobalSlice.actions;
export default userGlobalSlice.reducer;

export const selectSafeContent = (state : UserRootState) => state.userGlobal.safeContent;
export const selectBanners = (state : UserRootState) => state.userGlobal.banners ?? [];
export const selectIsMaintenance = (state : UserRootState) => state.userGlobal.is_maintenance;

export const selectAuthUser = (state : UserRootState) => state.userGlobal.user;

export const selectIsSubscription = (state : UserRootState) => state.userGlobal.subscription;