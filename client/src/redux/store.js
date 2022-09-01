import { configureStore } from "@reduxjs/toolkit";
import orders from "./slices/ordersSlice";
import products from "./slices/productsSlice";

export default configureStore({
  reducer: {
    orders: orders,
    products: products,
  },
});
