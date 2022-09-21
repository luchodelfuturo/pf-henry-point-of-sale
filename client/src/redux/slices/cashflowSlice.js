import { createSlice } from "@reduxjs/toolkit";

export const cashflowSlice = createSlice({
    name: "cashFlow",
    initialState: {
        lastCashFlow: [],
        allCashFlow: [],
        filteredCashFlow: [],

    },
    reducers: {
        // ordersFinishedCash: (state, action) => {
        //   state.totalCash = action.payload;
        // },
        getLastCashFlow: (state, action) => {
            state.lastCashFlow = action.payload;
        },
        getAllCashFlow: (state, action) => {
            state.allCashFlow = action.payload;
        },
        searchDateCashFlow: (state, action) => {
            const allCashFlows = state.filteredCashFlow
            state.allCashFlow = allCashFlows.filter(cash => cash.date === action.payload)
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
    getLastCashFlow,
    getAllCashFlow,
    searchDateCashFlow,
} = cashFlowSlice.actions;

export default cashFlowSlice.reducer;