import { createSlice } from "@reduxjs/toolkit";

export const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    allOrders: [],
    sortedOrders: [],
    status: 1,
    filteredOrders: [],
    ordersReady: [],

    finishedOrders: [],
  },
  reducers: {
    getOrders: (state, action) => {
      let orders = action.payload.filter((o) => o.status !== "ready");
      state.orders = orders.sort((a, b) => {
        return a.orderNumber - b.orderNumber;
      }).filter(order => order.active === true);
    },
    getAllOrders: (state, action) => {
      state.orders = action.payload.sort((a, b) => {
        return a.orderNumber - b.orderNumber
      }).filter(order => order.active === true)
      state.allOrders = action.payload.sort((a, b) => {
        return b.orderNumber - a.orderNumber;
      }).filter(order => order.active === true)
    },
    sortByOrderNumber: (state, action) => {
      let sortedOrders = state.orders;
      sortedOrders.sort((a, b) => {
        return a.orderNumber - b.orderNumber;
      });
      state.sortedOrders = sortedOrders;
    },
    updateStatus: (state, action) => {
      state.status = state.status += 1;
    },
    filterDoing: (state, action) => {
      const filter = state.orders.filter((o) => o.status === "doing");
      filter.length
        ? (state.filteredOrders = filter)
        : (state.filteredOrders = []);
    },
    filterPending: (state, action) => {
      const filter = state.orders.filter((o) => o.status === "pending");
      filter.length
        ? (state.filteredOrders = filter)
        : (state.filteredOrders = []);
    },
    clean: (state, action) => {
      state.orders = action.payload;
      state.filteredOrders = action.payload;
      state.ordersReady = action.payload;
    },
    //nuevo:
    postOrders: (state, action) => {
      state.orders.concat(action.payload);
    },
    //new reducer
    ordersReadyReducer: (state, action) => {
      state.ordersReady = action.payload;
    },
    ordersFinished: (state, action) => {
      state.finishedOrders = [action.payload];
    },
    cleanReady: (state, action) => {
      state.ordersReady = action.payload;
    },
    filterFromDate: (state, action) => {
      const orders = state.orders;
      const { from, to } = action.payload

      // console.log(dateFrom, "dateFrom");
      // console.log("dateTo:", dateTo);
      console.log("date1:", from)
      console.log("date2:", to)
      state.allOrders = orders.filter(o => o.date >= from && o.date <= to)
    },
    filterToDate: (state, action) => {
      const orders = state.orders

      state.allOrders = orders.filter(o => o.date <= action.payload)
    },

    disableOrder: (state, action) => {
      state.allOrders = state.allOrders.filter(order => order.active === true)
      state.orders = state.orders.filter(order => order.active === true)
    },
    filterStatus: (state, action) => {
      const orders = state.orders
      state.allOrders = action.payload === "All Orders" ? state.orders : orders.filter(order => order.status === action.payload)
    }
  },
});

export const {
  getOrders,
  sortByOrderNumber,
  updateStatus,
  filterDoing,
  filterPending,
  clean,
  getAllOrders,
  postOrders,
  ordersReadyReducer,
  ordersFinished,
  cleanReady,
  filterFromDate,
  filterToDate,
  disableOrder,
  filterStatus
} = ordersSlice.actions;
export default ordersSlice.reducer;
