import { createSlice } from "@reduxjs/toolkit";
import {
	fetchAllLoans,
	fetchAllLoansTypes,
	addLoan,
} from "../../services/loanService";

const initialState = {
	loans: [],
	loanTypes: [],
	loan: {},
	pagination: {
		isFirst: true,
		isLast: false,
		totalPages: 0,
		totalElements: 0,
	},
	status: "init",
	error: null,
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
			state.status = action.meta.requestStatus;
			state.error = null;
		},
		[fetchAllLoans.pending]: (state, action) => {
			state.status = action.meta.requestStatus;
		},
		[fetchAllLoans.rejected]: (state, action) => {
			state.loans = [];
			state.pagination = {
				isFirst: true,
				isLast: true,
				totalElements: 0,
				totalPages: 1,
			};
			state.error = action.error.message;
			state.status = action.error.name;
		},
		[fetchAllLoansTypes.fulfilled]: (state, action) => {
			state.loanTypes = action.payload.data;
			state.status = action.meta.requestStatus;
			state.error = null;
		},
		[fetchAllLoansTypes.pending]: (state, action) => {
			state.status = action.meta.requestStatus;
		},
		[fetchAllLoansTypes.rejected]: (state, action) => {
			state.loanTypes = [];
			state.error = action.error.message;
			state.status = action.error.name;
		},
		[addLoan.fulfilled]: (state, action) => {
			state.loan = action.payload.data;
			state.status = action.meta.requestStatus;
			state.error = null;
		},
		[addLoan.pending]: (state, action) => {
			state.status = action.meta.requestStatus;
		},
		[addLoan.rejected]: (state, action) => {
			state.loan = {};
			state.error = action.error.message;
			state.status = action.error.name;
		},
	},
});

export default loanSlice.reducer;
