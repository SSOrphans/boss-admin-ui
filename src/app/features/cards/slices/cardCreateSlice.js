import { createSlice } from "@reduxjs/toolkit";
import { addCard } from "../../services/cardService";

const initialState = {
  card: {
    numberHash: "-",
    accountId: "-",
    activeSince: new Date(),
    expirationDate: new Date(),
    pin: "-",
    cvv: "-",
    confirmed: "false",
    active: "false",
    stolen: "false",
    cardType: "CARD_PLAIN",
  },
  props: {
    isSavable: false,
    isValidPin: false,
    isValidCvv: false,
    isValidNumberHash: false,
    isValidAccountId: false,
    cardId: null,
  },
  status: "init",
  error: null,
};

export const cardCreateSlice = createSlice({
  name: "cardCreate",
  initialState,
  reducers: {
    validForm(state, action) {
      state.props = action.payload;
    },
    updateCard(state, action) {
      state.card = action.payload;
    },
  },
  extraReducers: {
    [addCard.fulfilled]: (state, action) => {
      state.props.cardId = action.payload.data.id;
      state.status = action.meta.requestStatus;
      state.error = null;
    },
    [addCard.pending]: (state, action) => {
      state.status = action.meta.requestStatus;
    },
    [addCard.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = action.error.name;
    },
  },
});

export const { validForm, updateCard } = cardCreateSlice.actions;

export default cardCreateSlice.reducer;
