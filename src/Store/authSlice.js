import { createSlice } from "@reduxjs/toolkit";

const initialState={id:null, isLoggedIn : false}
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action) =>{
            state.id=action.payload.id
            state.isLoggedIn=true;
        },
        logout:(state) =>{
            state.id = null;
            state.isLoggedIn = false
        }
    }

})
export default authSlice.reducer;
export const authActions = authSlice.actions;