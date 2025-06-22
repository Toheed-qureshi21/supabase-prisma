import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "@/libs/redux/slices/task.slice.js"

export const store = configureStore({
    reducer:{
        todo:todoReducer
    }
})