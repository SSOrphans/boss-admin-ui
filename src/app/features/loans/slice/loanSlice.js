import { createSlice } from "@reduxjs/toolkit";
import { fetchAllLoans } from "../../services/loanService";

const initialState = {
	loans: [],
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
			console.log(state.pagination);
		},
	},
});

export default loanSlice.reducer;
