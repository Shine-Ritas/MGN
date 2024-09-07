import { ComicCategory } from "@/pages/admin/Category/type";
import { createSlice } from "@reduxjs/toolkit";


interface Categories {
    categories?: null | ComicCategory[],
}

const initialState: Categories = {
    categories: null,
};

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        setCategories(state, action) {
            state.categories = action.payload;
            console.log('categories was stored' , action.payload);  
        },
        addCategories(state,action){
            state.categories?.push(action.payload);
        },
        updateCategories(state,action){
            const index = state.categories?.findIndex(category => category.id === action
                .payload.id) as number;
            if(index !== -1){
                state.categories?.splice(index,1,action.payload);
            }
            
        },
        removeCategories(state,action){ 
            const index = state.categories?.findIndex(category => category.id === action
                .payload) as number;
            if(index !== -1){
                state.categories?.splice(index,1);
            }
        }
            
    }
});

export const { setCategories, addCategories, updateCategories, removeCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;

export const selectSafeMode = (state: { userGlobal: { safeMode: boolean } }) => state.userGlobal.safeMode;