import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./language";

//redux store
export const store = configureStore({
  reducer: {
    language: languageReducer,
  },
});
