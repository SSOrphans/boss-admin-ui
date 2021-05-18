import { createSlice } from "@reduxjs/toolkit";
import {  } from "../../services/cardService";

const initialState = {
  card: {
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
  },
  status: "init",
  error: null,
};

export const cardCreateSlice = createSlice({
  name: "cardCreate",
  initialState,
  reducers: {
  },
  extraReducers: {
  },
});

export const {  } = cardCreateSlice.actions;

export default cardCreateSlice.reducer;
