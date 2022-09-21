import { createSlice } from "@reduxjs/toolkit";

export const cashFlowSlice = createSlice({
    name: "cashFlow",
    initialState: {
        lastCashFlow: []
        // totalCash: [],
        // totalPaypal: [],
        // totalIncome: [],
        // totalExpenses: [],
        // totalSales: [],
        // cashInit: [],
        // totalAll: [],
    },
    reducers: {
        // ordersFinishedCash: (state, action) => {
        //   state.totalCash = action.payload;
        // },
        getLastCashFlow: (state, action) => {
            state.lastCashFlow = action.payload;
        }
        // ordersFinishedPaypal: (state, action) => {
        //   state.totalPaypal = action.payload;
        // },
        // getTotalIncome: (state, action) => {
        //   state.totalIncome = action.payload;
        // },
        // getTotalExpense: (state, action) => {
        //   state.totalExpenses = action.payload;
        // },
        // getTotalSales: (state, action) => {
        //   state.totalSales = action.payload;
        // },
        // addCashInit: (state, action) => {
        //   console.log(action.payload);
        //   state.cashInit = [action.payload];
        // },
        // getTotal: (state, action) => {
        //   state.totalAll = action.payload;
        // },
    },
});

export const {
    //   getTotalIncome,
    //   getTotalExpense,
    //   getTotalSales,
    //   addCashInit,
    //   ordersFinishedCash,
    //   ordersFinishedPaypal,
    //   getTotal,
    getLastCashFlow
} = cashFlowSlice.actions;

export default cashFlowSlice.reducer;
