import { configureStore } from "@reduxjs/toolkit";
import products from "./productsSlice";

export default configureStore({
  reducer: {
    products: products,
  },
});
