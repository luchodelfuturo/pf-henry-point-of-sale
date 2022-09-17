import axios from "axios";
import {
  getAllProducts,
  filterByCategory,
  disableProduct,
  sortProducts,
  searchProducts,
  searchByName,
} from "../slices/productsSlice";

export const getProducts = () => (dispatch) => {
  axios
    .get("/products")

    .then((res) => {
      //      console.log(res)
      dispatch(getAllProducts(res.data));
    })

    .catch((e) => console.log(e));
};

export const postProducts = (product) => async (dispatch) => {
  return await axios.post("/products/add", product);
};

export const filterByCategoryAction = (category) => (dispatch) => {
  console.log("Haciendo filter by category action");
  dispatch(filterByCategory(category));
};

export const sortProductsAction = (order) => (dispatch) => {
  dispatch(sortProducts(order));
};

export const disableProductAction = (id) => (dispatch) => {
  console.log("llega a la action");
  axios
    .put(`/products/disable/${id}`)
    .then((res) => {
      dispatch(disableProduct(res.data));
    })
    .catch((e) => console.log(e));
};

export const searchByNameAction = (name) => (dispatch) => {
  axios
    .get("/products?name=" + name)
    .then((res) => {
      console.log("res.data:", res.data.rows[0]);
      dispatch(searchByName(res.data));
    })
    .catch((e) => console.log(e));
};

export const searchProductsName = (name) => (dispatch) => {
  console.log("Entra a search");
  dispatch(searchProducts(name));
};
