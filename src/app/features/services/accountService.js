import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAccount = createAsyncThunk(
  "account/fetchAccount",
  async ({id}) => {
    return await axios.get(`http://localhost:8080/api/admin/v1/accounts/${id}`);
  }
);

export const deleteAccount = createAsyncThunk(
  "account/deleteAccount",
  async ({id}) => {
    return await axios.delete(`http://localhost:8080/api/admin/v1/accounts/${id}`);
  }
);

export const fetchAccountList = createAsyncThunk(
  "accounts/fetchAccountList",
  async (params= {}) => {
    return await axios.get(`http://localhost:8080/api/admin/v1/accounts/`,
      {params}
    );
  }
)
