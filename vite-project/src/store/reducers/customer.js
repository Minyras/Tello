import { createSlice } from "@reduxjs/toolkit";
import {
  createJWT,
  getCustomer,
  getOrders,
  updateCustomerInfo,
} from "../actions/customerThunk";

const initialState = {
  customerId: "",
  customer: {},
  orders: [],
  token: "",
  updateStatus: "nothing",
  status: "nothing",
  error: "",
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    signOut: (state) => {
      state.customerId = "";
      state.customer = {};
      state.token = "";
      state.orders = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJWT.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createJWT.fulfilled, (state, { payload }) => {
        state.customerId = payload.customer_id;
        state.token = payload.jwt;
        state.status = "fulfilled";
        state.error = "";
      })
      .addCase(createJWT.rejected, (state, { payload }) => {
        state.customerId = "";
        state.token = "";
        state.status = "error";
        state.error = payload;
      })
      .addCase(getOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrders.fulfilled, (state, { payload }) => {
        state.orders = payload;
        state.status = "fulfilled";
        state.error = "";
      })
      .addCase(getOrders.rejected, (state, { payload }) => {
        state.orders = "";
        state.status = "error";
        state.error = payload;
      })
      .addCase(getCustomer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCustomer.fulfilled, (state, { payload }) => {
        state.customer = payload;
        state.status = "fulfilled";
        state.error = "";
      })
      .addCase(getCustomer.rejected, (state, { payload }) => {
        state.customer = {};
        state.status = "error";
        state.error = payload;
      })
      .addCase(updateCustomerInfo.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateCustomerInfo.fulfilled, (state, { payload }) => {
        state.customer = payload;
        state.updateStatus = "fulfilled";
        state.error = "";
      })
      .addCase(updateCustomerInfo.rejected, (state, { payload }) => {
        state.updateStatus = "error";
        state.error = payload;
      });
  },
});

export const { signOut } = customerSlice.actions;

export default customerSlice.reducer;
