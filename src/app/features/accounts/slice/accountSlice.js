import {createSlice} from "@reduxjs/toolkit";
import {fetchAccount} from "../../services/accountService";

const accountDefaultState = {
  "id": 0,
  "name": "",
  "balance": 0,
  "opened": "0",
  "closed": "",
  "confirmed": "",
  "active": "",
  "branchId": 0,
  "accountType": "ACCOUNT_INVALID",
}

export const accountSlice = createSlice(
  {
    name: 'account',
    initialState: accountDefaultState,
    reducers: {},
    extraReducers: {
      [fetchAccount.fulfilled]: (state, action) => {
        const data = action.payload.data;
        data.closed = data.closed? data.closed : 'No';
        data.confirmed = data.confirmed? 'Yes' : 'No'
        data.active = data.active? 'Yes' : 'No';
        
        state.account = data;
      },
      [fetchAccount.rejected]: (state, action) => {
        console.log(action)
      }
    }
  }
)

export default accountSlice.reducer;
