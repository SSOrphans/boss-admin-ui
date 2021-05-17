import { createSlice } from "@reduxjs/toolkit";
import { getCardDetail, saveCardDetail } from "../../services/cardService";

const initialState = {
  card: {
    id: "-",
    numberHash: "-",
    accountId: "-",
    created: "-",
    activeSince: "-",
    expirationDate: "-",
    pin: "-",
    cvv: "-",
    confirmed: "-",
    active: "-",
    stolen: "-",
    cardType: "-",
  },
  props: {
    isSavable: true,
    isValidPin: true,
    isValidCvv: true,
    isValidNumberHash: true,
    isValidAccountId: true,
    isEditable: false,
  },
  status: "init",
  error: null,
};

export const cardSlice = createSlice({
  name: "cardDetails",
  initialState,
  reducers: {
    editCard(state, action) {
      state.props.isEditable = action.payload;
    },
    validForm(state, action) {
      state.props = action.payload;
    },
    updateCard(state, action) {
      state.card = action.payload;
    },
  },
  extraReducers: {
    [getCardDetail.fulfilled]: (state, action) => {
      let payload = action.payload;
      payload.created = new Date(payload.created).toISOString();
      payload.activeSince = new Date(payload.activeSince).toISOString();
      payload.expirationDate = new Date(payload.expirationDate).toISOString();

      state.card = payload;
      state.status = "idle";
    },
    [getCardDetail.rejected]: (state, action) => {
      state.error = action.error.message;
    },
    [saveCardDetail.rejected]: (state, action) => {
      console.log(action.error.message);
      state.error = action.error.message;
    },
  },
});

export const { editCard, validForm, updateCard, canSave } = cardSlice.actions;

export default cardSlice.reducer;
