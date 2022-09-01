import { createSlice } from "@reduxjs/toolkit";

export const statesSlice = createSlice({
  name: "statesReducer",
  initialState: {
    orders: [],
    products: [],
  },
  reducers: {
    getOrders: (state, action) => {
      state.orders = action.payload;
    },
    getAllProducts: (state, action) => {
      state.products = action.payload;
    },
    getProdById: (state, action) => {
      state.detail = action.payload;
    },
  },
});

export const { getOrders, getAllProducts, getProdById } = statesSlice.actions;
export default statesSlice.reducer;
