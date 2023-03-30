import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./language";
import statusReducer from "./status";

//redux store
export const store = configureStore({
  reducer: {
    language: languageReducer,
    status: statusReducer,
  },
});
