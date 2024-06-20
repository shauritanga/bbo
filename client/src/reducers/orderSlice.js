import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orders: [],
  status: "idle",
  error: null,
  filters:{
    searchTerm:"",
    counter:"10"
  }
};

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async (customer) => {
const {sort, id} = customer;
  const response = await fetch(`http://localhost:5001/api/orders/${sort}/${id}`);
  const data = await response.json();
  return data;
});

export const addOrder = createAsyncThunk("orders/addOrder", async (order) => {
    const response = await axios.post(
      "http://localhost:5001/api/orders",
      order
    );
    return response.data;
  })

const ordersSlice = createSlice({
    name:"orders",
    initialState,
    reducers:{
        setSearchTerm:(state,action)=>{
            state.filters.searchTerm = action.payload;
        },
        setCounter:(state,action)=>{
            state.filters.counter = action.payload;
        }
    },
   extraReducers:(builder)=>{
    builder.addCase(fetchOrders.pending,(state)=>{
        state.status = "loading";
    });
    builder.addCase(fetchOrders.fulfilled,(state,action)=>{
        state.status = "succeeded";
        state.orders = action.payload;
    });
    builder.addCase(fetchOrders.rejected,(state,action)=>{
        state.status = "failed";
        state.error = action.error.message;
    })
    .addCase(addOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders.push(action.payload);
      });
   }
});



export const {setCounter,setSearchTerm } = ordersSlice.actions;
export default ordersSlice.reducer;