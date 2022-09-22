import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const usersReducer = createSlice({
    name: "users",
    initialState: [],
    reducers:{
        dispatchGetAllUsers : (state, action) => {
            return action.payload
        },
        default : (state, action) => {
            return state
        }
    }
})

export const fetchAllUsers = async (token) => {
    const res = await axios.get('/users/all_infor', {
        headers: {Authorization: token}
    })
    return res
}

export const { dispatchGetAllUsers } = usersReducer.actions;
export default usersReducer.reducer;