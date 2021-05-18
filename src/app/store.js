import { configureStore } from "@reduxjs/toolkit";

import cardDetailReducer from "./features/cards/slices/cardDetailSlice";
import cardCreateReducer from "./features/cards/slices/cardCreateSlice";

export const store = configureStore({
  reducer: {
    cardDetail: cardDetailReducer,
    cardCreate: cardCreateReducer,
  },
  // need more research on serializable objects for redux
  // temporarily disabling checks for api calls due to errors
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
