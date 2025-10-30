import { EncryptStorage } from "@/utilities/encrypt-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "@/config";
import { queryApi } from "../api/queryApi";


const initialState = {
    title: "Radian",
    logo : null
}

const ens_storage = new EncryptStorage(config.secretKey);

export const getAppliactionConfig = createAsyncThunk(
    "admin/getAppliactionConfig",
    async (_, { dispatch }) => {
        try {
            const cachedConfig = ens_storage.get("application-config");
            const cachedExpire = ens_storage.get("application-config-expire-time");

            const now = Date.now();

            // ✅ Use cache only if not expired
            if (cachedConfig && cachedExpire && now < Number(cachedExpire)) {
                return JSON.parse(cachedConfig);
            }

            // 🛰 Fetch from API if no cache or expired
            const result = await dispatch(
                queryApi.endpoints.getData.initiate("/application-configs")
            ).unwrap();
            
            const expireTime = now + 1 * 60 * 1000; // 1 minute from now

            // 💾 Save data and expiration time
            ens_storage.set("application-config", JSON.stringify(result));
            ens_storage.set("application-config-expire-time", expireTime.toString());

            return result;  
        } catch (error) {
            console.error("Failed to fetch admin permissions:", error);
            throw error;
        }
    }
);




export const applicationConfigSlice = createSlice({
    name: "application-config",
    initialState,
    reducers:{
        setApplicationConfig(state,action){
            return action.payload
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(getAppliactionConfig.fulfilled,(state,action)=>{
            return action.payload
        })
    }
})

export default applicationConfigSlice.reducer;
export const selectApplicationConfig = (state) => state.applicationConfig