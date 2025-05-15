import  AuthReducer  from "./authSlice";
import PostReducer from './postSlice'
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({ reducer: { auth: AuthReducer ,posts:PostReducer } 
});
export default store;
