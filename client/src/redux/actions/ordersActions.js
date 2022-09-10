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
  filterStatus
} from "../slices/ordersSlice";

export const getOrdersAction = () => (dispatch) => {
  axios
    .get(`http://localhost:3001/orders`)
    .then((res) => dispatch(getOrders(res.data)))
    .catch((e) => console.log(e));
};
export const getAllOrdersAction = () => (dispatch) => {
  axios
    .get(`http://localhost:3001/orders`)
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
    .put(`http://localhost:3001/orders/put/${orderNumber}`, {
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
  fetch(`http://localhost:3001/orders`, {
    method: "POST",
    body: JSON.stringify(order),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((res) => res.json())
    .then((r) => dispatch(postOrders(r.data)));
};
//---------------new actions
export const ordersReadyAction = () => (dispatch) => {
  axios
    .get("http://localhost:3001/orders/ready/")
    .then((res) => dispatch(ordersReadyReducer(res.data)))
    .catch((e) => console.log(e));
};

export const updateStatusFinished = (status, orderNumber) => (dispatch) => {
  axios
    .put(`http://localhost:3001/orders/ready/put/${orderNumber}`, {
      status: status,
    })
    .then((res) => dispatch(updateStatus(res.data)));
};

export const cleanReadyAction = () => (dispatch) => {
  dispatch(cleanReady());
};

export const filterFromDateAction = (dateFrom, toFrom) => (dispatch) => {
  dispatch(filterFromDate(dateFrom, toFrom));
};
export const filterToDateAction = (dateTo) => (dispatch) => {
  dispatch(filterToDate(dateTo));
};

export const disableOrderAction = (orderNumber) => (dispatch) => {

  console.log("Disable Order ")
  axios.put(`http://localhost:3001/orders/put/disable/${orderNumber}`)
    .then((res) => { dispatch(disableOrder(res.data)) })
    .catch((e) => console.log(e))
}

export const filterStatusAction = (status) => (dispatch) => {
  dispatch(filterStatus(status));
}