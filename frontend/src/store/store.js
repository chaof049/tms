import { configureStore } from "@reduxjs/toolkit";
import { botApi } from "../services/api/botService";
import botSlice from "../features/botSlice";

export const store = configureStore({
  reducer: {
    bot: botSlice,
    [botApi.reducerPath]: botApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([botApi.middleware]),
});
