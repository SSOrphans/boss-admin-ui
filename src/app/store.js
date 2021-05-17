import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "./features/accounts/slice/accountSlice";

export const store = configureStore({
	reducer: {
		account: accountSlice
	},
});
