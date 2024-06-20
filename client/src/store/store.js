import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "../reducers/orderSlice.js";


export default configureStore({
    reducer: {
        orders: ordersReducer
    }
});
