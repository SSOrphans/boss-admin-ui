import { configureStore } from "@reduxjs/toolkit";

import cardReducer from "./features/cards/slices/cardSlice";

export const store = configureStore({
  reducer: {
    cardDetail: cardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
