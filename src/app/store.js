import { configureStore } from "@reduxjs/toolkit";

import cardReducer from "../features/cards/slicers/cardSlice";

export const store = configureStore({
  reducer: {
    card: cardReducer,
  },
});
