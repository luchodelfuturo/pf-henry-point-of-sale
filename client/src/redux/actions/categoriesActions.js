import axios from "axios";
import { getAllCategories } from "../slices/categoriesSlice";

export const getCategories = () => (dispatch) => {
  axios
    .get("/category")

    .then((res) => {
      console.log(res);
      dispatch(getAllCategories(res.data));
    })

    .catch((e) => console.log(e));
};
