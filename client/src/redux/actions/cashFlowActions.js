import axios from "axios";
import {
  getLastCashFlow
} from "../slices/cashFlowSlice";


export const getLastCashFlowAction = () => (dispatch) => {
  return axios
    .get("/cash/getLastCashFlow")

    .then((res) => dispatch(getLastCashFlow(res.data[0])))
}

export const infoCashFlowAction = (order) => (dispatch) => {
  return axios
    .put(`/cash/updateCashFlow/`, order)
    .then(console.log("put exitoso!"))
}
export const addIncomeAction = (income) => (dispatch) => {
  return axios
    .put("/cash/addIncome", income)
    .then((res) => console.log(res));
};

export const addExpenseAction = (expenses) => (dispatch) => {
  return axios
    .put("/cash/addExpense", expenses)
    .then((res) => console.log(res));
};

export const addCashInitAction = (init) => (dispatch) => {
  // return dispatch(addCashInit(init));
  return axios.post(`/cash/newCashFlow/`, { initCash: init })
    .then(console.log("post Init Cash exitoso xd!"))

};


