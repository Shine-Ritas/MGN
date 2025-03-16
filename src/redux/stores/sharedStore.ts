
import categoriesSlice from "../slices/category-slice";
import { postApi } from "../api/postApi";
import { queryApi } from "../api/queryApi";
import { applicationConfigSlice } from "../slices/application-config-slice";

export const sharedReducers = {
    [postApi.reducerPath]: postApi.reducer,
    [queryApi.reducerPath]: queryApi.reducer,
    categories: categoriesSlice,
    applicationConfig:applicationConfigSlice.reducer
};

export const sharedMiddleware = (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(
        postApi.middleware,
        queryApi.middleware
    );