import { AnyAction, configureStore, Reducer } from "@reduxjs/toolkit";
import { chillApi } from "../services/api";
import rootReducer, { RootStateType } from "./reducers";

export const store = configureStore({
  reducer: rootReducer as Reducer<RootStateType, AnyAction>,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat([chillApi.middleware]),
});
