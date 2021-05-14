import { createSlice } from "@reduxjs/toolkit";
import { getCardDetail } from "../../services/cardService";

const initialState = {
  cards: [
    {
      id: 0,
      numberHash: 0,
      accountId: 0,
      created: "",
      activeSince: "",
      expirationDate: "",
      pin: 0,
      cvv: 0,
      confirmed: false,
      active: false,
      stolen: false,
      cardType: "",
    },
  ],
  status: "init",
  error: null,
};

export const cardSlice = createSlice({
  name: "cardDetails",
  initialState,
  reducers: {},
  extraReducers: {
    [getCardDetail.pending]: (state, action) => {
      console.log(action);
    },
    [getCardDetail.fulfilled]: (state, action) => {
      console.log(action.payload);
      if (state.length > 5) {
        state.pop();
      }
      state.cards.unshift(action.payload);
      state.status = "idle";
    },
    [getCardDetail.rejected]: (state, action) => {
      console.log(action.error.message);
      state.error = action.error.message;
    },
  },
});

export const { updateCard } = cardSlice.actions;

export default cardSlice.reducer;
