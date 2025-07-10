import { configureStore } from "@reduxjs/toolkit";
import { workPermitApi } from "./api/workPermit/workPermitApi";

export const store = configureStore({
  reducer: {
    [workPermitApi.reducerPath]: workPermitApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(workPermitApi.middleware),
});

export default store;
