import {createSlice} from "@reduxjs/toolkit";

const initialState =
  {
    loginState: false
  };

export const loginSlice = createSlice({
  name: "loginState",
  initialState,
  reducers: {
    login(state, action) {
      state.loginState = true;
    },
  },
  extraReducers: {},
});

export const {login} = loginSlice.actions;

export default loginSlice.reducer;
