import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllLoans = createAsyncThunk(
	"loans/fetchAllLoans",
	async () => await axios.get("http://localhost:8080/api/loans")
);
