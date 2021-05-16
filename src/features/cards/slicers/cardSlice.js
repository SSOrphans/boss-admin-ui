import { createSlice } from "@reduxjs/toolkit";
import { getCardDetail, updateCardDetail } from "../../services/cardService";

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
    isEditable: false,
    isValidEmail: false,
    isValidPin: false,
    isValidCvv: false,
    isValidNumberHas: false,
    isValidAccountId: false,
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
  },
  extraReducers: {
    [getCardDetail.fulfilled]: (state, action) => {
      let payload = action.payload;
      payload.created = new Date(payload.created).toLocaleDateString();
      payload.activeSince = new Date(payload.activeSince).toLocaleDateString();
      payload.expirationDate = new Date(
        payload.expirationDate
      ).toLocaleDateString();

      state.card = payload;
      state.status = "idle";
    },
    [getCardDetail.rejected]: (state, action) => {
      console.log(action.error.message);
      state.error = action.error.message;
    },
    [updateCardDetail.fulfilled]: (state, action) => {
      state.card = action.payload
    },
  },
});

export const { editCard, validForm } = cardSlice.actions;

export default cardSlice.reducer;
