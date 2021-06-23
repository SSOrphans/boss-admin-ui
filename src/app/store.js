import { configureStore } from "@reduxjs/toolkit";
import loanSlice from "./features/loans/slice/loanSlice";
import accountSlice from "./features/accounts/slices/accountSlice";
import accountListSlice from "./features/accounts/slices/accountListSlice";

import cardListReducer from "./features/cards/slices/card-list-slice";
import cardCreateReducer from "./features/cards/slices/card-create-slice";
import cardDetailReducer from "./features/cards/slices/card-detail-slice";
import loginSlice from "./features/home/slices/home-login-slice";
import cardMainReducer from "./features/cards/slices/card-main-slice";
import cardCsvReducer from "./features/cards/slices/card-csv-slice";

export const store = configureStore({
  reducer: {
    cardMain: cardMainReducer,
    cardList: cardListReducer,
    cardDetail: cardDetailReducer,
    cardCreate: cardCreateReducer,
    cardCsv: cardCsvReducer,
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
