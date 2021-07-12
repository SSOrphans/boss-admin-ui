import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "login",
  async (params = { username: "", password: "" }) => {
    return await axios.post("http://localhost:8080/login", params);
  }
);