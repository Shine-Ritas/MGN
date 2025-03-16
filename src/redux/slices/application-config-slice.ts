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
            const applicationConfig = ens_storage.get("application-config");

            if (applicationConfig) {
                return JSON.parse(applicationConfig);
            }

            const result = await dispatch(queryApi.endpoints.getData.initiate("/application-configs")).unwrap();
            
            const expireTime = new Date().getTime() + 2 * 24 * 60 * 60 * 1000;
            ens_storage.set("application-config", JSON.stringify(result), expireTime);

            return result;  
        } catch (error) {
            console.error("Failed to fetch admin permissions:", error);
            throw error;
        }
    }
) ;



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