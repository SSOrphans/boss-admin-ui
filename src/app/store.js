import { configureStore } from "@reduxjs/toolkit";
import loanSlice from "./features/loans/slice/loanSlice";
import accountSlice from "./features/accounts/slices/accountSlice";
import accountListSlice from "./features/accounts/slices/accountListSlice";

import cardCreateReducer from "./features/cards/slices/card-create-slice";
import cardDetailReducer from "./features/cards/slices/card-detail-slice";
import loginSlice from "./features/home/slices/home-login-slice";

export const store = configureStore({
  reducer: {
    cardDetail: cardDetailReducer,
    cardCreate: cardCreateReducer,
		account: accountSlice,
		accountList: accountListSlice,
    loans: loanSlice,
    login: loginSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
