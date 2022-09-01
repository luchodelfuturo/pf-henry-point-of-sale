import axios from "axios"

import { getAllProducts } from "./productsSlice";


export const getProducts = () => (dispatch) =>  {
    axios("http://192.168.0.16:3001/products")
    .then(res => dispatch(getAllProducts(res.data.products)))
    .catch(e=>console.log(e))
}