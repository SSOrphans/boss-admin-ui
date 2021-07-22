import { createSlice } from "@reduxjs/toolkit";
import { fetchCardList } from "../../services/card-service";

// values (0, '$2y$10$TXGKrHHL2zU97JOPx56OOemig.JFin8JwDz5jLNZj2o/fzapHmiha', 2311, 1, 1546600672000, 1546601672000,
//         1735689600000, '0219', '288', true, true, false);

const cardDefaultState = {
  cardPage: {
    cards: [],
    page: 1,
    pages: 1,
    options: { limit: 5, sortBy: "id", keyword: "", filter: "", page: 0, sortDirection: "DESC" },
    isFilterDropdownOpen: false,
    filter: "",
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
      const cards = action.payload;
      state.cardPage = {...state.cardPage, ...cards, status: "fetched" };
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