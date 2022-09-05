import axios from "axios";
import { getAllCategories } from "../slices/categoriesSlice";

export const getCategories = () => (dispatch) => {
    console.log('hola get categories')
    axios
        .get("http://192.168.0.12:3001/category")

        .then((res) => {
            console.log(res)
            dispatch(getAllCategories(res.data))
        })

        .catch((e) => console.log(e));

};