import axios from "axios";
import { getAllProducts, filterByCategory } from "../slices/productsSlice";


export const getProducts = () => (dispatch) => {
  console.log('hola get products')
  axios
    .get("http://192.168.0.12:3001/products")

    .then((res) => {
      //      console.log(res)
      dispatch(getAllProducts(res.data))
    })

    .catch((e) => console.log(e));

};

export const postProducts = (product) => async (dispatch) => {
  console.log('hola post products')
  return await axios.post("http://localhost:3001/products/add", product)
}

export const filterByCategoryAction = (category) => (dispatch) => {
  console.log('Haciendo filter by category action')
  dispatch(filterByCategory(category))
}