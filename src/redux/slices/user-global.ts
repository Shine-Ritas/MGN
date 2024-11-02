import { Banner } from '@/pages/admin/Settings/Banner/type';
import { UserRootState } from '../stores/userStore';
import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { EncryptStorage } from '@/utilities/encrypt-storage';
import config from '@/config';

interface UserGlobal {
    isAuth: boolean;
    user: null | {
        id: string;
        name: string;
        email: string;
        user_code: string;
        role: string;
        active : number;
        subscription_end_date? : string;
        subscription_name? : string;
    };
    safeContent: boolean;
    subscription?: boolean;
    banners : Banner[];
    is_maintenance?: boolean;
}
const secretKey = config.secretKey;
const ens_storage = new EncryptStorage(secretKey);

const storedUser = JSON.parse(ens_storage.get('user')!) ?? null;
const hasSubscription = storedUser?.subscription_end_date && new Date(storedUser.subscription_end_date) > new Date();

const initialState: UserGlobal = {
    isAuth: false,
    user: storedUser,
    safeContent: localStorage.getItem('safeContent') !== 'false',
    subscription: hasSubscription,
    banners: [],
    is_maintenance: localStorage.getItem('is_maintenance') === 'true'
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