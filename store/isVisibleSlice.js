import { createSlice } from "@reduxjs/toolkit";

const isVisibleSlice = createSlice({
  name: "isTradeVisible",
  initialState: {
    isVisible: false,
  },
  reducers: {
    toggleVisible: (state) => {
      state.isVisible = !state.isVisible;  // Correctly update the property within the state object
    },
  },
});

export const { toggleVisible } = isVisibleSlice.actions;

export default isVisibleSlice.reducer;
