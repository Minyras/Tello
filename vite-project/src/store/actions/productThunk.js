import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchPageProducts,
  fetchSelectedProducts,
  fetchSearchedProducts,
  fetchProduct,
} from "../../commerce/products";

export const getPageProducts = createAsyncThunk(
  "products/getPageProducts",
  async ({ sortBy, sortOrder, category, query }, thunkAPI) => {
    try {
      const data = await fetchPageProducts({
        sortBy,
        sortOrder,
        category,
        query,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error bas verdi");
    }
  }
);

export const getSelectedProducts = createAsyncThunk(
  "products/getSelectedProducts",
  async ({ order, category }, thunkAPI) => {
    try {
      const data = await fetchSelectedProducts({ order, category });
      return { order: order, category: category, data: data };
    } catch (error) {
      return thunkAPI.rejectWithValue("Error bas verdi");
    }
  }
);

export const getSearchedProducts = createAsyncThunk(
  "products/getSearchedProducts",
  async ({ query }, thunkAPI) => {
    try {
      const data = await fetchSearchedProducts({ query });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error bas verdi");
    }
  }
);

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async ({ id }, thunkAPI) => {
    try {
      const data = await fetchProduct({ id });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error bas verdi");
    }
  }
);
