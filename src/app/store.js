import { configureStore } from "@reduxjs/toolkit";
import loanSlice from "./features/loans/slice/loanSlice";

export const store = configureStore({
	reducer: { loans: loanSlice },
});
