import { createSlice } from "@reduxjs/toolkit";
import {
  getPageProducts,
  getSelectedProducts,
  getSearchedProducts,
  getProduct,
} from "../actions/productThunk";

const initialState = {
  selectedProducts: {
    products: [],
    staus: "nothing",
    error: "",
  },
  searchedProducts: {
    products: [],
    staus: "nothing",
    error: "",
  },
  pageProducts: {
    products: [],
    staus: "nothing",
    error: "",
  },
  singleProduct: {
    product: {},
    variants: [],
    status: "nothing",
    error: "",
  },
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPageProducts.pending, (state) => {
        state.pageProducts.status = "loading";
      })
      .addCase(getPageProducts.fulfilled, (state, { payload }) => {
        state.pageProducts.status = "fulfilled";
        state.pageProducts.products = payload;
      })
      .addCase(getPageProducts.rejected, (state, { payload }) => {
        state.pageProducts.status = "error";
        state.pageProducts.products = [];
        state.pageProducts.error = payload;
      })
      .addCase(getSelectedProducts.pending, (state) => {
        state.selectedProducts.status = "loading";
      })
      .addCase(getSelectedProducts.fulfilled, (state, { payload }) => {
        state.selectedProducts.status = "fulfilled";
        state.selectedProducts.products.push(payload);
      })
      .addCase(getSelectedProducts.rejected, (state, { payload }) => {
        state.selectedProducts.status = "error";
        state.selectedProducts.products = [];
        state.selectedProducts.error = payload;
      })
      .addCase(getSearchedProducts.pending, (state) => {
        state.searchedProducts.status = "loading";
      })
      .addCase(getSearchedProducts.fulfilled, (state, { payload }) => {
        state.searchedProducts.status = "fulfilled";
        state.searchedProducts.products = payload;
      })
      .addCase(getSearchedProducts.rejected, (state, { payload }) => {
        state.searchedProducts.status = "error";
        state.searchedProducts.products = [];
        state.searchedProducts.error = payload;
      })
      .addCase(getProduct.pending, (state) => {
        state.singleProduct.status = "loading";
      })
      .addCase(getProduct.fulfilled, (state, { payload }) => {
        state.singleProduct.status = "fulfilled";
        state.singleProduct.product = payload;
      })
      .addCase(getProduct.rejected, (state, { payload }) => {
        state.singleProduct.status = "error";
        state.singleProduct.product = {};
        state.singleProduct.error = payload;
      });
  },
});

export default productSlice.reducer;
