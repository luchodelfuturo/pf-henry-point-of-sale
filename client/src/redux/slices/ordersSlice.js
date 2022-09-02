import { createSlice } from "@reduxjs/toolkit";

export const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    sortedOrders: [],
    status: 1,
    filteredOrders: [],
  },
  reducers: {
    getOrders: (state, action) => {
      state.orders = action.payload;
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
      const filter = state.orders.filter((o) => o.status === "d");

      state.filteredOrders = filter;
    },
    filterPending: (state, action) => {
      const filter = state.orders.filter((o) => o.status === "p");

      state.filteredOrders = filter;
    },
    clean: (state, action) => {
      state.sortedOrders = action.payload;
      state.filteredOrders = action.payload;
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
} = ordersSlice.actions;
export default ordersSlice.reducer;
