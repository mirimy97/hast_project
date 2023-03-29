import { createSlice } from "@reduxjs/toolkit";

export const statusSlice = createSlice({
  name: "status",
  initialState: {
    isMobile: false,
    isLogo: true,
    // defaultPoint: {
    //   lat: 0,
    //   lng: 0,
    //   altitude: 50,
    // },
  },
  reducers: {
    setIsMobile(state, action) {
      state.isMobile = action.payload;
    },
    setIsLogo(state, action) {
      state.isLogo = action.payload;
    },
  },
});

export const { setIsMobile, setIsLogo } = statusSlice.actions;
export default statusSlice.reducer;
