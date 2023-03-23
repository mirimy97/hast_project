import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./language";
import isMobileReducer from "./isMobile";

//redux store
export const store = configureStore({
  reducer: {
    language: languageReducer,
    isMobile: isMobileReducer,
  },
});
