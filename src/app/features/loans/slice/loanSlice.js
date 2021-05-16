import { createSlice } from "@reduxjs/toolkit";
import { fetchAllLoans, fetchAllLoansTypes } from "../../services/loanService";

const initialState = {
	loans: [],
	loanTypes: [],
	pagination: {
		isFirst: true,
		isLast: false,
		totalPages: 0,
		totalElements: 0,
	},
};

const loanSlice = createSlice({
	name: "loans",
	initialState,
	reducers: {},
	extraReducers: {
		[fetchAllLoans.fulfilled]: (state, action) => {
			state.loans = action.payload.data.content;
			state.pagination = {
				isFirst: action.payload.data.first,
				isLast: action.payload.data.last,
				totalElements: action.payload.data.totalElements,
				totalPages: action.payload.data.totalPages,
			};
		},
		[fetchAllLoans.rejected]: (state, action) => {
			state.loans = [];
			state.pagination = {
				isFirst: true,
				isLast: true,
				totalElements: 0,
				totalPages: 1,
			};
		},
		[fetchAllLoansTypes.fulfilled]: (state, action) => {
			state.loanTypes = action.payload.data;
		},
		[fetchAllLoansTypes.rejected]: (state, action) => {
			state.loanTypes = [];
		},
	},
});

export default loanSlice.reducer;
