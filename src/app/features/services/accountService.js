import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAccount = createAsyncThunk(
  "account/fetchAccount",
  async ({id}) => {
    return await axios.get(`/api/admin/v1/accounts/${id}`);
  }
);

export const deleteAccount = createAsyncThunk(
  "account/deleteAccount",
  async ({id}) => {
    return await axios.delete(`/api/admin/v1/accounts/${id}`);
  }
)
