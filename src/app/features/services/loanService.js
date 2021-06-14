import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllLoans = createAsyncThunk(
	"loans/fetchAllLoans",
	async ({ page, sortBy, dir, limit, filter, keyword }) => {
		let url = new URL(`http://localhost:8080/api/loans`);
		url.searchParams.append("page", page?.toString());
		url.searchParams.append("sort", sortBy?.toString());
		url.searchParams.append("sortDir", dir?.toString());
		url.searchParams.append("limit", limit?.toString());
		url.searchParams.append("filter", filter?.toString());
		url.searchParams.append("keyword", keyword?.toString());
		return await axios.get(url.href);
	}
);

export const fetchAllLoansTypes = createAsyncThunk(
	"loans/fetchAllLoansTypes",
	async () => {
		let url = new URL(`http://localhost:8080/api/loans/types`);
		return await axios.get(url.href);
	}
);

export const addLoan = createAsyncThunk("loans/addLoan", async (loan) => {
	let url = new URL(`http://localhost:8080/api/loans`);
	return await axios.post(url.href, loan);
});

export const editLoan = createAsyncThunk("loans/editLoan", async (loan) => {
	let url = new URL(`http://localhost:8080/api/loans/${loan.id}`);
	return await axios.put(url.href, loan);
});

export const deleteLoan = createAsyncThunk("loans/deleteLoan", async (id) => {
	let url = new URL(`http://localhost:8080/api/loans/${id}`);
	return await axios.delete(url.href);
});
