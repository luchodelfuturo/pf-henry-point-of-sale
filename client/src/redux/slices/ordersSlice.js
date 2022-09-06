import { createSlice } from "@reduxjs/toolkit";

export const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    sortedOrders: [],
    status: 1,
    filteredOrders: [],
    ordersReady: [],
  },
  reducers: {
    getOrders: (state, action) => {
      let orders = action.payload.filter((o) => o.status !== "ready");
      state.orders = orders.sort((a, b) => {
        return a.orderNumber - b.orderNumber;
      });
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
    cleanReady: (state, action) => {
      state.ordersReady = action.payload;
    },
  },
});

export const {
  getOrders,
  sortByOrderNumber,
  updateStatus,
  filterDoing,
  filterPending,
  clean,
  postOrders,
  ordersReadyReducer,
  cleanReady,
} = ordersSlice.actions;
export default ordersSlice.reducer;
