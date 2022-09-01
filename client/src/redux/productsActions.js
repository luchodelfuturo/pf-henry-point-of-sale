import axios from "axios"

import { getAllProducts, getProdById } from "./productsSlice";


export const getProducts = () => (dispatch) =>  {
    axios("http://localhost:3001/products")
    .then(res => dispatch(getAllProducts(res.data.products)))
    .catch(e=>console.log(e))
}