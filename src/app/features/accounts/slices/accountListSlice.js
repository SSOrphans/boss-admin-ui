import {createSlice} from "@reduxjs/toolkit";
import {fetchAccountList} from "../../services/accountService";

const accountDefaultState = {
  accountPage: {
    accounts: [], page: 1, pages: 1,
    options: {limit: 5, sortBy: "id", keyword: "", filter: "", offset: 1, sortDirection: "DESC"},
    isFilterDropdownOpen: false,
    filter: "ACCOUNT_INVALID",
    status: "init"
  }
}

export const accountListSlice = createSlice(
  {
    name: 'accountList',
    initialState: accountDefaultState,
    reducers: {
      setSortBy(state, action) {
        state.accountPage.options.sortBy = action.payload.sortBy;
      },
      setKeyword(state, action) {
        state.accountPage.options.keyword = action.payload.keyword;
      },
      setFilter(state, action) {
        state.accountPage.filter = action.payload.filter
      },
      toggleFilterDropdown(state, action) {
        state.accountPage.isFilterDropdownOpen = !state.accountPage.isFilterDropdownOpen
      }
    },
    extraReducers: {
      [fetchAccountList.fulfilled]: (state, action) => {
        const data = action.payload.data;
        data.status = "fetched";
        data.sortBy = state.sortBy;
        state.accountPage = data;
      },
      [fetchAccountList.rejected]: (state, action) => {
        state.accountPage.status = "error";
      }
    }
  }
)

export const {setSortBy, setKeyword, toggleFilterDropdown, setFilter} = accountListSlice.actions;

export default accountListSlice.reducer;
