import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    detail: {},
  },
  reducers: {
    getAllProducts: (state, action) => {
      console.log(action.payload)
      state.products = action.payload;
    },
    getProdById: (state, action) => {
      state.detail = action.payload;
    },
  },
});

export const { getAllProducts, getProdById } = productsSlice.actions;

export default productsSlice.reducer;
