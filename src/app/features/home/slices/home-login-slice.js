import { createSlice } from "@reduxjs/toolkit";
import { login } from "../../services/login-service";

const initialState = {
  isLoggedIn: false
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      const token = action.payload.data.token;
      if (token !== undefined)
      {
        state.isLoggedIn = true;
        localStorage.setItem("clientPass", token);
        return;
      }

      state.isLoggedIn = false;
    }
  }
});

export default loginSlice.reducer;
