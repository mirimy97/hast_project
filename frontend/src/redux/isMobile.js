import { createSlice } from "@reduxjs/toolkit";

export const isMobileSlice = createSlice({
  name: "isMobile",
  initialState: {
    isMobile: false,
  },
  reducers: {
    setIsMobile(state, action) {
      state.isMobile = action.payload;
    },
  },
});

export const { setIsMobile } = isMobileSlice.actions;
export default isMobileSlice.reducer;
