import { createSlice } from "@reduxjs/toolkit";

export const cashFlowSlice = createSlice({
    name: "cashFlow",
    initialState: {
        allCashFlows: [],
        CashFlows: [],


    },
    reducers: {
        getAllCashFlow: (state, action) => {
            state.allCashFlows = action.payload;
            state.CashFlows = action.payload;
        },
        searchDateCashFlow: (state, action) => {

            const allDates = state.CashFlows
            const filterDate = allDates.filter(cash => cash.date === action.payload)

            state.allCashFlows = filterDate
        }
        // getCategoryById: (state, action) => {
        //     state.categoryDetail = action.payload;
        // },
    },
});

export const { getAllCashFlow, searchDateCashFlow } = cashFlowSlice.actions;

export default cashFlowSlice.reducer;