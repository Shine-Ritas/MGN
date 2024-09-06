
import categoriesSlice from "../slices/category-slice";
import { postApi } from "../api/postApi";
import { queryApi } from "../api/queryApi";

export const sharedReducers = {
    [postApi.reducerPath]: postApi.reducer,
    [queryApi.reducerPath]: queryApi.reducer,
    categories: categoriesSlice,
};

export const sharedMiddleware = (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(
        postApi.middleware,
        queryApi.middleware
    );