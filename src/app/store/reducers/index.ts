import { chillApi } from "@/app/services/api";
import { AnyAction, combineReducers } from "redux";

// ini akan berisi semua reducer slice yang dibuat
// kamu bisa membuat reducer slice di folder reducers
const reducers = {
  [chillApi.reducerPath]: chillApi.reducer,
};

const combinedReducers = combineReducers(reducers);
const rootReducer = (state: RootStateType, action: AnyAction) => {
  return combinedReducers(state, action);
};
export type RootStateType = ReturnType<typeof combinedReducers>;

export default rootReducer;
