import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "@/libs/redux/slices/task.slice.js"
import userSlice from "@/libs/redux/slices/user.slice.js"
export const store = configureStore({
    reducer:{
        todo:todoReducer,
        user:userSlice
    }
})