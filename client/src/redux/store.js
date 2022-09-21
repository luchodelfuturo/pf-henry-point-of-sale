import { configureStore } from "@reduxjs/toolkit";
import orders from "./slices/ordersSlice";
import products from "./slices/productsSlice";
import categories from "./slices/categoriesSlice";
import cashFlow from "./slices/cashFlowSlice";
import auth from './slices/authSlice'
import token from './slices/tokenSlice'
import users from './slices/usersSlice'

export default configureStore({
  reducer: {
    orders: orders,
    products: products,
    categories: categories,
    cashFlow: cashFlow,
    auth: auth,
    token: token,
    users: users
  },
});
