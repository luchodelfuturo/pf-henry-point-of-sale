import axios from "axios";
import { getAllProducts } from "../slices/productsSlice";

export const getProducts = () => (dispatch) => {
  axios
    .get("http://localhost:3001/products")
    .then((res) => dispatch(getAllProducts(res.data)))
    .catch((e) => console.log(e));
};

export const searchProducts = (name) => (dispatch) => {
  axios.get(`http://localhost:3001/products?name=${name}`)
  .then((res) => dispatch(getAllProducts(res.data)))
  .then(data => console.log(data))
  .catch((e) => console.log(e));
};