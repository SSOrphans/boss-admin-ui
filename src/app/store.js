import { configureStore } from "@reduxjs/toolkit";
import loanSlice from "./features/loans/slice/loanSlice";

import cardCreateReducer from "./features/cards/slices/card-create-slice";
import cardDetailReducer from "./features/cards/slices/card-detail-slice";

export const store = configureStore({
  reducer: {
    cardDetail: cardDetailReducer,
    cardCreate: cardCreateReducer,
    loans: loanSlice,
  },
  // need more research on serializable objects for redux
  // temporarily disabling checks for api calls due to errors
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
