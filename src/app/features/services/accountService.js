import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAccount = createAsyncThunk(
  "account/fetchAccount",
  async ({id}) => {
    return await axios.get(`${process.env.REACT_APP_ACCOUNT_URL}/api/admin/v1/accounts/${id}`);
  }
);

export const deleteAccount = createAsyncThunk(
  "account/deleteAccount",
  async ({id}) => {
    
    return await axios.delete(`${process.env.REACT_APP_ACCOUNT_URL}/api/admin/v1/accounts/${id}`);
  }
);

export const fetchAccountList = createAsyncThunk(
  "accounts/fetchAccountList",
  async (params= {}) => {
    return await axios.get(`${process.env.REACT_APP_ACCOUNT_URL}/api/admin/v1/accounts/`,
      {params}
    );
  }
)

export const createAccount = createAsyncThunk(
  "account/createAccount",
  async (params) => {
    console.log(params)
    return await axios.post(`${process.env.REACT_APP_ACCOUNT_URL}/api/admin/v1/accounts/`,
      params)
  }
)
