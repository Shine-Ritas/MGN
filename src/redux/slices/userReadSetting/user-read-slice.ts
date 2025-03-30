import config from "@/config";
import { queryApi } from "@/redux/api/queryApi";
import { EncryptStorage } from "@/utilities/encrypt-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const ens_storage = new EncryptStorage(config.secretKey);

export const userReadedThisChapter = createAsyncThunk(
    "user-readed-this-chapter",
    async ({ mogou_id, sub_mogou_id }: { mogou_id: string; sub_mogou_id: string }, { dispatch }) => {
        try {
            const key = `content-readed-${mogou_id}-${sub_mogou_id}`;
            const storedValue = ens_storage.get(key);

            if (storedValue) {
                const { value, expireTime } = JSON.parse(storedValue);
                console.log(value)
                if (new Date().getTime() < expireTime) {
                    return null; // Data is still valid, no need to fetch again
                } else {
                    ens_storage.remove(key); // Expired, remove it
                }
            }

            const result = await dispatch(
                queryApi.endpoints.getData.initiate(`users/mogous/${mogou_id}/chapters/${sub_mogou_id}/viewed`)
            ).unwrap();

            // Store with expiration
            const expireTime = new Date().getTime() + 5 * 60 * 1000;
            ens_storage.set(key, JSON.stringify({ value: "true", expireTime }));

            return result;
        } catch (error) {
            console.error("Failed to fetch admin permissions:", error);
            throw error;
        }
    }
);


export type UserReadedThisChapterType = typeof userReadedThisChapter.fulfilled;

export const userReadSlice = createSlice({
    name: "auth-permissions",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(userReadedThisChapter.fulfilled, (state, action) => {
            if (action.payload !== null) {
                return action.payload; // Only update state if payload is valid
            }
        });
    },
});

export default userReadSlice.reducer;
