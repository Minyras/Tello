import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCustomer,
  exchangeToken,
  fetchCustomer,
  fetchOrders,
  updateCustomer,
} from "../../commerce/customer";

export const createJWT = createAsyncThunk(
  "customer/createJWT",
  async ({ token }, thunkAPI) => {
    try {
      const data = await exchangeToken({ token });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error bas verdi");
    }
  }
);

export const registerCustomer = createAsyncThunk(
  "customer/registerCustomer",
  async ({ email, phone, firstname, lastname }, thunkAPI) => {
    try {
      const data = await createCustomer({ email, phone, firstname, lastname });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error bas verdi");
    }
  }
);

export const updateCustomerInfo = createAsyncThunk(
  "customer/updateCustomerInfo",
  async ({ customerId, email, phone, firstname, lastname }, thunkAPI) => {
    try {
      const data = await updateCustomer({
        customerId,
        email,
        phone,
        firstname,
        lastname,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error bas verdi");
    }
  }
);

export const getOrders = createAsyncThunk(
  "customer/getOrders",
  async ({ customerId }, thunkAPI) => {
    try {
      const data = await fetchOrders({ customerId });
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error bas verdi");
    }
  }
);

export const getCustomer = createAsyncThunk(
  "customer/getCustomer",
  async ({ customerId }, thunkAPI) => {
    try {
      const data = await fetchCustomer({ customerId });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error bas verdi");
    }
  }
);
