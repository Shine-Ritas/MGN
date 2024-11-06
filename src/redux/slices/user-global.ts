import { Banner } from '@/pages/admin/Settings/Banner/type';
import { UserRootState } from '../stores/userStore';
import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import userInitialState from '@/data/store/users-store-data';
import { EncryptStorage } from "@/utilities/encrypt-storage";
import config from "@/config";

const ens_storage = new EncryptStorage(config.secretKey);

export const userGlobalSlice = createSlice({
    name: "userGlobal",
    initialState : userInitialState,
    reducers: {
        setAuth(state, action) {
            state.isAuth = action.payload;
        },
        setUser(state, action) {
            state.user = action.payload;
            ens_storage.set('user', JSON.stringify(action.payload));
            if(action.payload.subscription_end_date && new Date(action.payload.subscription_end_date) > new Date())
            {
                state.subscription = true;
            }
            else
            {
                state.subscription = false;
            }
        },
        setSafeContent(state, action: PayloadAction<boolean>) {
            state.safeContent = action.payload;
        },
        setBanners(state, action: PayloadAction<Banner[]>) {
            if(!state.subscription)
            {
                state.banners = action.payload;
            }
        },
        setMaintenance(state, action: PayloadAction<boolean>) {
            state.is_maintenance = action.payload;
            localStorage.setItem('is_maintenance', action.payload ? 'true' : 'false');
        },
        setFavorite(state, action: PayloadAction<string[]>) {
            state.favorite = action.payload;
        },
        setContinueReading(state, action: PayloadAction<string[]>) {
            state.continueReading = action.payload;
        }
    },
});


export const { setAuth, setUser, setSafeContent,setBanners,setMaintenance } = userGlobalSlice.actions;
export default userGlobalSlice.reducer;

export const selectSafeContent = (state : UserRootState) => state.userGlobal.safeContent;
export const selectBanners = (state : UserRootState) => state.userGlobal.banners ?? [];
export const selectIsMaintenance = (state : UserRootState) => state.userGlobal.is_maintenance;
export const selectAuthUser = (state : UserRootState) => state.userGlobal.user;
export const selectIsSubscription = (state : UserRootState) => state.userGlobal.subscription
export const selectFavorite = (state : UserRootState) => state.userGlobal.favorite;
export const selectContinueReading = (state : UserRootState) => state.userGlobal.continueReading;