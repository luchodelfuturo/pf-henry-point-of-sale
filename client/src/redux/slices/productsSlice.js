import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    allProducts: [],
    detail: {},
  },
  reducers: {
    getAllProducts: (state, action) => {
      state.products = action.payload;
      state.allProducts = action.payload;
      console.log("all products reducer,", state.allProducts)
    },
    getProdById: (state, action) => {
      state.detail = action.payload;
    },
    filterByCategory: (state, action) => {
      state.products = state.allProducts.filter(prod => prod.categories[0].name.toLowerCase().includes(action.payload))

    }
  },
});

export const { getAllProducts, getProdById, filterByCategory } = productsSlice.actions;

export default productsSlice.reducer;
