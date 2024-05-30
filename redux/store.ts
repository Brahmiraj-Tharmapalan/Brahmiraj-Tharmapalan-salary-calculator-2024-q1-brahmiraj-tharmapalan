import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import  basicSalaryReducer from "@/redux/basicSalary/BasicSalary";
import earningsReducer from "@/redux/earnings/Earnings";
import deductionsReducer from "@/redux/deductions/Deductions";

const rootReducer = combineReducers({
  basicSalary:  basicSalaryReducer,
  earnings: earningsReducer,
  deductions: deductionsReducer
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;