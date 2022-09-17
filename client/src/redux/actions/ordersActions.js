import axios from "axios";
import {
  clean,
  getOrders,
  sortByOrderNumber,
  filterDoing,
  updateStatus,
  filterPending,
  postOrders,
  ordersReadyReducer,
  getAllOrders,
  cleanReady,
  filterFromDate,
  filterToDate,
  disableOrder,
  filterStatus,
  ordersFinishedPaypal,
  ordersFinishedCash,
  getTotalIncome,
} from "../slices/ordersSlice";

export const getOrdersAction = () => (dispatch) => {
  axios
    .get(`/orders`)
    .then((res) => dispatch(getOrders(res.data)))
    .catch((e) => console.log(e));
};
export const getAllOrdersAction = () => (dispatch) => {
  axios
    .get(`/orders`)
    .then((res) => dispatch(getAllOrders(res.data)))
    .catch((e) => console.log(e));
};

export const sortByOrderNumberAction = () => (dispatch) => {
  dispatch(sortByOrderNumber());
};

export const cleanAction = () => (dispatch) => {
  dispatch(clean([]));
};

export const updateStatusAction = (status, orderNumber) => (dispatch) => {
  axios
    .put(`/orders/put/${orderNumber}`, {
      status: status,
    })
    .then((res) => dispatch(updateStatus(res.data)));
};

export const filterDoingAction = () => (dispatch) => {
  dispatch(filterDoing());
};

export const filterPendingAction = () => (dispatch) => {
  dispatch(filterPending());
};

export const postOrdersAction = (order) => (dispatch) => {
  console.log(order);
  fetch(`/orders`, {
    method: "POST",
    body: JSON.stringify(order),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((res) => res.json())
    .then((r) => dispatch(postOrders(r.data)));
};

export const ordersReadyAction = () => (dispatch) => {
  axios
    .get("/orders/ready/")
    .then((res) => dispatch(ordersReadyReducer(res.data)))
    .catch((e) => console.log(e));
};

export const updateStatusFinished = (status, orderNumber) => (dispatch) => {
  axios
    .put(`/orders/ready/put/${orderNumber}`, {
      status: status,
    })
    .then((res) => dispatch(updateStatus(res.data)));
};

export const getTotalCashAction = () => (dispatch) => {
  axios
    .get("/cash/payment-cash/1")
    .then((res) => dispatch(ordersFinishedCash(res.data)))
    .catch((e) => console.log(e));
};

export const getTotalPaypalAction = () => (dispatch) => {
  axios
    .get("cash/payment-paypal/1")
    .then((res) => dispatch(ordersFinishedPaypal(res.data)))
    .catch((e) => console.log(e));
};

export const cleanReadyAction = () => (dispatch) => {
  dispatch(cleanReady());
};

export const filterFromDateAction = (dates) => (dispatch) => {
  dispatch(filterFromDate(dates));
};
export const filterToDateAction = (dateTo) => (dispatch) => {
  dispatch(filterToDate(dateTo));
};

export const disableOrderAction = (orderNumber) => (dispatch) => {
  console.log("Disable Order ");
  axios
    .put(`/orders/put/disable/${orderNumber}`)
    .then((res) => {
      dispatch(disableOrder(res.data));
    })
    .catch((e) => console.log(e));
};

export const filterStatusAction = (status) => (dispatch) => {
  dispatch(filterStatus(status));
};
export const addIncomeAction = (income) => (dispatch) => {
  console.log(income);
  return axios
    .post("/cash/addIncome/1", { income: income })
    .then((res) => console.log(res));
};

export const addExpenseAction = (expense) => (dispatch) => {
  console.log(expense);
  return axios.post("/cash/addExpense/1", expense);
};

export const getTotalIncomeAction = () => (dispatch) => {
  return axios
    .get("/cash/showIncome/1")
    .then((res) => dispatch(getTotalIncome(res.data)))
    .catch((e) => console.log(e));
};
