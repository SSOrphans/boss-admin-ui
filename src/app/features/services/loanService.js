import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllLoans = createAsyncThunk(
	"loans/fetchAllLoans",
	async ({ page }) => {
		let url = new URL(`http://localhost:8080/api/loans`);
		url.searchParams.append("page", page?.toString());
		return await axios.get(url.href);
	}
);
