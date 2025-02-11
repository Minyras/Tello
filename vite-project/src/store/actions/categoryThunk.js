import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMenuCategories } from "../../commerce/categories";

export const getMenuCategories = createAsyncThunk(
  "categories/getMenuCategories",
  async (_, thunkAPI) => {
    try {
      const { data } = await fetchMenuCategories();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error bas verdi");
    }
  }
);
