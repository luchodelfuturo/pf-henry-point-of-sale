import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


const authSlice = createSlice({
    name: "auth",
    initialState : {
        user: [],
        isLogged: false,
        isAdmin: false
    },
    reducers:{
        dispatchLogin : (state, action) => {
            return {
                 ...state,
                isLogged: true
            }
        },
        dispatchGetUser :  (state, action) => {
            state.user = action.payload
            state.isAdmin = action.payload.role === "admin" ? true : false

        },
        default : (state, action) => {
            return state
        }
    }   
})

export const fetchUser = async (token) => {
    const res = await axios.get('/users/infor', {
        headers: {Authorization: token}
    })
    return res
}

export const {dispatchLogin, dispatchGetUser } = authSlice.actions;
export default authSlice.reducer;