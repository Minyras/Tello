import { createSlice } from "@reduxjs/toolkit";
import { getMenuCategories } from "../actions/categoryThunk";

const initialState = {
  categories: {
    menuCategories: [],
  },
  status: "nothing",
  error: "",
};

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMenuCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMenuCategories.fulfilled, (state, { payload }) => {
        state.status = "fulfilled";
        state.categories.menuCategories = payload;
      })
      .addCase(getMenuCategories.rejected, (state, { payload }) => {
        state.status = "error";
        state.categories.menuCategories = {};
        state.error = payload;
      });
  },
});

export default categorySlice.reducer;
