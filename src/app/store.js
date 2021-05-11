import { configureStore } from "@reduxjs/toolkit";
import loanSlice from "./loans/loanSlice";

export const store = configureStore({
	reducer: { loans: loanSlice },
});
