import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  history: [],
};

export const searchHistorySlice = createSlice({
  name: "searchHistory",
  initialState,
  reducers: {
    addSearchHistory: (state, { payload }) => {
      if (state.history.includes(payload)) {
        state.history.splice(state.history.indexOf(payload), 1);
      }
      state.history.unshift(payload);
    },
    clearSearchHistory: (state) => {
      state.history = [];
    },
  },
});

export const { addSearchHistory, clearSearchHistory } =
  searchHistorySlice.actions;

export default searchHistorySlice.reducer;
