import { createSlice } from "@reduxjs/toolkit";

const tokenReducer = createSlice({
    name: "token",
    initialState: "",
    reducers:{
        dispatchGetToken : (state, action) => {
            return action.payload
        },
        default : (state, action) => {
            return state
        }
    }
})

export const { dispatchGetToken } = tokenReducer.actions;
export default tokenReducer.reducer;