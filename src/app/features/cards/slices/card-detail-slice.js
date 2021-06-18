import { createSlice } from "@reduxjs/toolkit";
import {
  getCardDetail,
  saveCardDetail,
  deleteCard,
} from "../../services/card-service";

const initialState = {
  card: {
    id: 0,
    numberHash: "-",
    accountId: "-",
    created: new Date(),
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
    isSavable: true,
    isValidPin: true,
    isValidCvv: true,
    isValidNumberHash: true,
    isValidAccountId: true,
    isClickable: false,
    showConfirmModal: false,
  },
  status: "init",
  error: null,
};

export const cardDetailSlice = createSlice({
  name: "cardDetails",
  initialState,
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
    setCardId(state, action) {
      state.card.id = action.payload;
    },
    editCard(state, action) {
      state.props.isClickable = action.payload;
    },
    validForm(state, action) {
      state.props = action.payload;
    },
    updateCard(state, action) {
      state.card = action.payload;
    },
    confirmDelete(state, action) {
      state.props.showConfirmModal = action.payload;
    },
  },
  extraReducers: {
    [getCardDetail.fulfilled]: (state, action) => {
      let payload = action.payload;
      payload.created = new Date(payload.created).toISOString();
      payload.activeSince = new Date(payload.activeSince).toISOString();
      payload.expirationDate = new Date(payload.expirationDate).toISOString();

      state.card = payload;
      state.status = action.type;
      state.error = null;
    },
    [getCardDetail.pending]: (state, action) => {
      state.status = action.meta.requestStatus;
    },
    [getCardDetail.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = action.error.name;
    },
    [saveCardDetail.fulfilled]: (state, action) => {
      state.props.isClickable = false;
      state.status = action.type;
      state.error = null;
    },
    [saveCardDetail.pending]: (state, action) => {
      state.status = action.meta.requestStatus;
    },
    [saveCardDetail.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = action.error.name;
    },
    [deleteCard.fulfilled]: (state, action) => {
      state.status = action.type;
      state.error = null;
    },
    [deleteCard.pending]: (state, action) => {
      state.status = action.meta.requestStatus;
    },
    [deleteCard.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = action.error.name;
    },
  },
});

export const {
  editCard,
  validForm,
  updateCard,
  canSave,
  confirmDelete,
  setStatus,
  setCardId,
} = cardDetailSlice.actions;

export default cardDetailSlice.reducer;
