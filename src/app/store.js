import { configureStore } from "@reduxjs/toolkit";

import cardDetailReducer from "./features/cards/slices/cardDetailSlice";
import cardCreateReducer from "./features/cards/slices/cardCreateSlice";

export const store = configureStore({
  reducer: {
    cardDetail: cardDetailReducer,
    cardCreate: cardCreateReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
