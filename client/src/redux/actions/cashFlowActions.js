import axios from "axios";
import { getLastCashFlow } from "../slices/cashFlowSlice.js";

export const getLastCashFlowAction = () => (dispatch) => {
  return axios
    .get("/cash/getLastCashFlow")

    .then((res) => dispatch(getLastCashFlow(res.data[0])));
};

export const infoCashFlowAction = (order) => (dispatch) => {
  return axios
    .put(`/cash/updateCashFlow/`, order)
    .then(console.log("put exitoso!"));
};
export const addIncomeAction = (income) => (dispatch) => {
  return axios.put("/cash/addIncome", income).then((res) => console.log(res));
};

export const addExpenseAction = (expenses) => (dispatch) => {
  return axios
    .put("/cash/addExpense", expenses)
    .then((res) => console.log(res));
};

export const addCashInitAction = (init) => (dispatch) => {
  // return dispatch(addCashInit(init));
  return axios
    .post(`/cash/newCashFlow/`, { initCash: init })
    .then(console.log("post Init Cash exitoso xd!"));
};

// export const getTotalIncomeAction = () => (dispatch) => {
//   return axios
//     .get("/cash/showIncome/1")
//     .then((res) => dispatch(getTotalIncome(res.data)))
//     .catch((e) => console.log(e));
// };

// export const getTotalExpenseAction = () => (dispatch) => {
//   return axios
//     .get("/cash/showExpense/1")
//     .then((res) => dispatch(getTotalExpense(res.data)))
//     .catch((e) => console.log(e));
// };

// export const getTotalSalesAction = () => (dispatch) => {
//   return axios
//     .get("/cash//totalSales/1")
//     .then((res) => dispatch(getTotalSales(res.data)))
//     .catch((e) => console.log(e));
// };

// export const getTotalCashAction = () => (dispatch) => {
//   axios
//     .get("/cash/payment-cash/1")
//     .then((res) => dispatch(ordersFinishedCash(res.data)))
//     .catch((e) => console.log(e));
// };

// export const getTotalPaypalAction = () => (dispatch) => {
//   axios
//     .get("cash/payment-paypal/1")
//     .then((res) => dispatch(ordersFinishedPaypal(res.data)))
//     .catch((e) => console.log(e));
// };

// export const getTotalAction = () => (dispatch) => {
//   axios
//     .get(`/cash/totalCash-register/1`)
//     .then((res) => dispatch(getTotal(res.data)));
// };

// export const cierreDeCaja = (obj) => (dispatch) => {
//   axios
//     .post(`/cash/close`, obj)
//     .then((res) => console.log(res))
//     .catch((e) => console.log(e));
// };
