import { createSlice } from "@reduxjs/toolkit";
import { fetchCardList } from "../../services/card-service";

// values (0, '$2y$10$TXGKrHHL2zU97JOPx56OOemig.JFin8JwDz5jLNZj2o/fzapHmiha', 2311, 1, 1546600672000, 1546601672000,
//         1735689600000, '0219', '288', true, true, false);

const cardDefaultState = {
  cardPage: {
    cards: [
      { id: 1, type: 0, lastFour: "2311", accountId: 1, created: 1546600672000, activeSince: 1546600672000, expires: 1735689600000, pin: "0219", cvv: "288", confirmed: true, active: true, stolen: false }
    ],
    page: 1,
    pages: 1,
    options: { limit: 5, sortBy: "id", keyword: "", filter: "", offset: 0, sortDirection: "DESC" },
    isFilterDropdownOpen: false,
    filter: "CARD_INVALID",
    status: "init"
  }
};

export const cardListSlice = createSlice({
  name: "cardList",
  initialState: cardDefaultState,
  reducers: {
    setSortBy(state, action) {
      state.cardPage.options.sortBy = action.payload.sortBy;
    },
    setKeyword(state, action) {
      state.cardPage.options.keyword = action.payload.keyword;
    },
    setFilter(state, action) {
      state.cardPage.options.filter = action.payload.filter
    },
    setLimit(state, action) {
      state.cardPage.options.offset =  action.payload.offset;
      state.cardPage.options.limit = action.payload.limit;
    },
    changePage(state, action){
      state.cardPage.options.offset = action.payload.offset;
    },
    toggleFilterDropdown(state, action) {
      state.cardPage.isFilterDropdownOpen = !state.cardPage.isFilterDropdownOpen
    }
  },
  extraReducers: {
    [fetchCardList.fulfilled]: (state, action) => {
      const data = action.payload.data;
      state.cardPage = {...state.cardPage, ...data, status: "fetched" };
    },
    [fetchCardList.rejected]: (state, action) => {
      state.cardPage.status = "error";
      state.cardPage.cards = [];
    }
  }
});

export const {
  setSortBy,
  setKeyword,
  toggleFilterDropdown,
  setFilter,
  setLimit,
  changePage
} = cardListSlice.actions;

export default cardListSlice.reducer;