import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToCart,
  updateItemInCart,
  removeItemFromCart,
  removeItemsFromCart,
  createCart,
} from "../../commerce/cart";

export const makeCart = createAsyncThunk(
  "cart/makeCart",
  async ({ submit }, thunkAPI) => {
    try {
      const data = await createCart({ submit });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error bas verdi");
    }
  }
);

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async ({ cartId, productId, quantity, options }, thunkAPI) => {
    try {
      const data = await addToCart({
        cartId,
        productId,
        quantity,
        options,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error bas verdi");
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ cartId, itemId, quantity }, thunkAPI) => {
    try {
      const data = await updateItemInCart({
        cartId,
        itemId,
        quantity,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error bas verdi");
    }
  }
);

export const deleteItemFromCart = createAsyncThunk(
  "cart/deleteItemFromCart",
  async ({ cartId, itemId }, thunkAPI) => {
    try {
      const data = await removeItemFromCart({
        cartId,
        itemId,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error bas verdi");
    }
  }
);

export const emptyCart = createAsyncThunk(
  "cart/emptyCart",
  async ({ cartId }, thunkAPI) => {
    try {
      const data = await removeItemsFromCart({
        cartId,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error bas verdi");
    }
  }
);
