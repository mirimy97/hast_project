import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "ko",
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    lanko: (state) => {
      state.value = "ko";
    },
    lanen: (state) => {
      state.value = "en";
    },
  },
});

export const { lanko, lanen } = languageSlice.actions;
export default languageSlice.reducer;
