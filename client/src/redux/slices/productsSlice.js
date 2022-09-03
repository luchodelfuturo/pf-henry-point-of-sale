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
      const filterProducts = action.payload === 'all categories' ? state.allProducts : state.allProducts.filter(prod => prod.categories[0].name.toLowerCase().includes(action.payload))
      console.log("filterProducts: " + filterProducts)
      //state.products = filterProducts
      !filterProducts.length > 0 ? state.products = 'No hay productos' : state.products = filterProducts;
    }
  },
});

export const { getAllProducts, getProdById, filterByCategory } = productsSlice.actions;

export default productsSlice.reducer;
