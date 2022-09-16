import axios from "axios";
import { getAllCashFlow, searchDateCashFlow } from "../slices/cashflowSlice"

export const getAllCashFlowAction = () => (dispatch) => {
    axios
        .get("http://localhost:3001/cash/history")

        .then((res) => {
            console.log(res.data);
            dispatch(getAllCashFlow(res.data));
        })

        .catch((e) => console.log(e));
};

export const searchDateCashFlowAction = (date) => (dispatch) => {
    
            dispatch(searchDateCashFlow(date));
        
};
