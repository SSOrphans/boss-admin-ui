import { configureStore } from "@reduxjs/toolkit";
import loanSlice from "./features/loans/slice/loanSlice";
import accountSlice from "./features/accounts/slices/accountSlice";
import accountListSlice from "./features/accounts/slices/accountListSlice";
import cardDetailReducer from "./features/cards/slices/cardDetailSlice";
import cardCreateReducer from "./features/cards/slices/cardCreateSlice";

export const store = configureStore({
  reducer: {
    cardDetail: cardDetailReducer,
    cardCreate: cardCreateReducer,
		account: accountSlice,
		accountList: accountListSlice,
    loans: loanSlice,
  },
  // need more research on serializable objects for redux
  // temporarily disabling checks for api calls due to errors
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
