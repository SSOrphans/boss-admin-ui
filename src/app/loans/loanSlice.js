import { createSlice } from "@reduxjs/toolkit";
import { fetchAllLoans } from "./loanService";

const initialState = {
	loans: [],
	status: "idle",
};

const loanSlice = createSlice({
	name: "loans",
	initialState,
	reducers: {},
	extraReducers: {
		[fetchAllLoans.fulfilled]: (state, action) => {
			state.loans = action.payload.data;
		},
	},
});

export default loanSlice.reducer;
