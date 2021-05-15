import { createSlice } from "@reduxjs/toolkit";
import { getCardDetail } from "../../services/cardService";

const initialState = {
  cards: [
    {
      id: 0,
      numberHash: 0,
      accountId: 0,
      created: "-",
      activeSince: "-",
      expirationDate: "-",
      pin: 0,
      cvv: 0,
      confirmed: false,
      active: false,
      stolen: false,
      cardType: "-",
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
    [getCardDetail.fulfilled]: (state, action) => {
      let payload = action.payload;
      payload.created = new Date(payload.created).toLocaleDateString()
      payload.activeSince = new Date(payload.activeSince).toLocaleDateString()
      payload.expirationDate = new Date(payload.expirationDate).toLocaleDateString()

      state.cards.unshift(payload);
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
