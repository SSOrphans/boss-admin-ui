import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 0,
    numberHash: 0,
    accountId: 0,
    created: "_",
    activeSince: "_",
    expirationDate: "_",
    pin: 0,
    cvv: 0,
    confirmed: false,
    active: false,
    stolen: false,
    cardType: { name: "_" },
  },
];

export const cardSlice = createSlice({
  name: "cardDetails",
  initialState,
  reducers: {
    updateCard(state, action) {
      if (state.length > 5) {
        state.pop();
      }
      state.unshift(action.payload);
    },
  },
});

export const { updateCard } = cardSlice.actions;

export default cardSlice.reducer;
