import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCardListViewable: true,
  isCardDetailViewable: false,
  isCardCreateViewable: false,
  isCardCsvViewable: false,
};

export const cardMainSlice = createSlice({
  name: "cardMain",
  initialState,
  reducers: {
    viewCardDetail(state, action) {
      state.isCardDetailViewable = action.payload;
    },
    viewCardCreate(state, action) {
      state.isCardCreateViewable = action.payload;
    },
    viewCardList(state, action) {
      state.isCardListViewable = action.payload;
    },
    viewCardCsv(state, action) {
      state.isCardCsvViewable = action.payload;
    },
  },
  extraReducers: {},
});

export const { viewCardDetail, viewCardCreate, viewCardList, viewCardCsv } =
  cardMainSlice.actions;

export default cardMainSlice.reducer;
