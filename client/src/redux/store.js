import { configureStore } from "@reduxjs/toolkit";
import orders from "./slices/ordersSlice";
import products from "./slices/productsSlice";
import categories from './slices/categoriesSlice'
export default configureStore({
  reducer: {
    orders: orders,
    products: products,
    categories: categories,
  },
});
