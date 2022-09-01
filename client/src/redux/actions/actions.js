import axios from "axios";
import { getOrders, getAllProducts } from "../slices/statesSlice";

export const getOrdersAction = () => (dispatch) => {
  axios
    .get(`http://localhost:3001/orders`)
    .then((res) => dispatch(getOrders(res.data)))
    .catch((e) => console.log(e));
};

export const getProducts = () => (dispatch) => {
  axios
    .get("http://localhost:3001/products")
    .then((res) => dispatch(getAllProducts(res.data.products)))
    .catch((e) => console.log(e));
};
