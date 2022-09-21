import { createSlice } from "@reduxjs/toolkit"

export const cashFlowSlice = createSlice({
    name: "cashFlow",
    initialState: {
        lastCashFlow: [],
        allCashFlow: [],
        filteredCashFlow: [],

    },
    reducers: {
        
        getLastCashFlow: (state, action) => {
            state.lastCashFlow = action.payload;
        },
        getAllCashFlow: (state, action) => {
            state.allCashFlow = action.payload;
            state.filteredCashFlow = action.payload;
        },
        searchDateCashFlow: (state, action) => {
            const filtro = state.filteredCashFlow;

            state.allCashFlow = filtro.filter(cash => cash.date === action.payload)
        }
        },
});

export const {
    getLastCashFlow,
    getAllCashFlow,
    searchDateCashFlow } = cashFlowSlice.actions;

export default cashFlowSlice.reducer; 