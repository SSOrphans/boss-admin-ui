import { createSlice } from "@reduxjs/toolkit";
import { addCard } from "../../services/card-service";

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
  cardId: null,
  isSavable: false,
  isValidPin: false,
  isValidCvv: false,
  isValidNumberHash: false,
  isValidAccountId: false,
  status: "init",
  error: null,
};

export const cardCreateSlice = createSlice({
  name: "cardCreate",
  initialState,
  reducers: {
    validForm(state, action) {
      state.isSavable = action.payload.isSavable;
      state.isValidPin = action.payload.isValidPin;
      state.isValidCvv = action.payload.isValidCvv;
      state.isValidNumberHash = action.payload.isValidNumberHash;
      state.isValidAccountId = action.payload.isValidAccountId;
    },
    updateCard(state, action) {
      state.card = action.payload;
    },
  },
  extraReducers: {
    [addCard.fulfilled]: (state, action) => {
      state.cardId = action.payload.data.id;
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
