import axios from "axios";
import { getAllProducts, filterByCategory } from "../slices/productsSlice";

export const getProducts = () => (dispatch) => {
  axios
    .get("http://localhost:3001/products")

    .then((res) => {
      //      console.log(res)
      dispatch(getAllProducts(res.data));
    })

    .catch((e) => console.log(e));
};

export const postProducts = (product) => async (dispatch) => {
  return await axios.post("http://localhost:3001/products/add", product);
};

export const filterByCategoryAction = (category) => (dispatch) => {
  console.log("Haciendo filter by category action");
  dispatch(filterByCategory(category));
};