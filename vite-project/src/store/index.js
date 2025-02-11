import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./reducers/products";
import categorySlice from "./reducers/categories";
import searchHistorySlice from "./reducers/searchHistory";
import cartSlice from "./reducers/cart";
import customerSlice from "./reducers/customer";
import { persistStore, persistReducer, PERSIST } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const searchHistory = persistReducer(persistConfig, searchHistorySlice);
const cart = persistReducer(persistConfig, cartSlice);
const customer = persistReducer(persistConfig, customerSlice);

export const store = configureStore({
  reducer: {
    product: productSlice,
    category: categorySlice,
    cart: cart,
    customer: customer,
    searchHistory: searchHistory,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
    }),
});

export const persistor = persistStore(store);
