import axios from "axios";
import { getAllProducts } from "../slices/productsSlice";

export const getProducts = () => (dispatch) => {
  axios
    .get("http://localhost:3001/products")
    .then((res) => dispatch(getAllProducts(res.data.products)))
    .catch((e) => console.log(e));
};
