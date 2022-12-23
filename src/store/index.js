import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-redux";
import expenseSlice from "./expense-slice";
import themeReducer from "./theme-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    expense: expenseSlice.reducer,

    theme: themeReducer.reducer,
  },
});

export default store;
