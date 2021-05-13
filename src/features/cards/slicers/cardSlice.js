import { createSlice } from "@reduxjs/toolkit";

const initialState = { something: "hello world!" };

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    test(state, action) {
      state.something = action.payload
    },
  },
});

export const { test } = cardSlice.actions;

export default cardSlice.reducer;
