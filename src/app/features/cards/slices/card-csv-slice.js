import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cardList: [],
  status: "init",
  error: null,
};

export const cardCsvSlice = createSlice({
  name: "cardCsv",
  initialState,
  reducers: {
    addCardToList(state, action) {
      state.cardList.push(action.payload);
    },
  },
  extraReducers: {},
});

export const { addCardToList } = cardCsvSlice.actions;

export default cardCsvSlice.reducer;
