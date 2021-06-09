import {createSlice} from "@reduxjs/toolkit";
import {fetchAccountList} from "../../services/accountService";

const accountDefaultState = {
  accountPage: {
    accounts: [], page: 1, pages: 1, limit: 5, sortBy: "id",
    status: "init"
  }
}

export const accountListSlice = createSlice(
  {
    name: 'accountList',
    initialState: accountDefaultState,
    reducers: {
      setSort(state, action) {
        state.accountPage.sortBy = action.payload.sortBy
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

export const {setSort} = accountListSlice.actions;

export default accountListSlice.reducer;
