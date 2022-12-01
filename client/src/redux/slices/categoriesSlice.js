import { createSlice } from "@reduxjs/toolkit";

export const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        categories: [],
        categoryDetail: {}

    },
    reducers: {
        getAllCategories: (state, action) => {
            state.categories = action.payload;
        },
        getCategoryById: (state, action) => {
            state.categoryDetail = action.payload;
        },
    },
});

export const { getAllCategories, getCategoryById } = categoriesSlice.actions;

export default categoriesSlice.reducer;