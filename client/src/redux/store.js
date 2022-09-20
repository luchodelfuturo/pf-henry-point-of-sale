import { configureStore } from "@reduxjs/toolkit";
import orders from "./slices/ordersSlice";
import products from "./slices/productsSlice";
<<<<<<< HEAD
import categories from './slices/categoriesSlice'
import auth from './slices/authSlice'
import token from './slices/tokenSlice'
import users from './slices/usersSlice'

=======
import categories from "./slices/categoriesSlice";
import cashFlow from "./slices/cashFlowSlice";
>>>>>>> f3c3bfade795fd4a80ffb7b517e7e6bd922330d8
export default configureStore({
  reducer: {
    orders: orders,
    products: products,
    categories: categories,
<<<<<<< HEAD
    auth: auth,
    token: token,
    users: users
=======
    cashFlow: cashFlow,
>>>>>>> f3c3bfade795fd4a80ffb7b517e7e6bd922330d8
  },
});
