import { createSlice } from "@reduxjs/toolkit";

const holdingSlice = createSlice({
  name: "holding",
  initialState: {
    holding: []
  },
  reducers: {
    addHolding: (state, action) => {
      state.holding = action.payload;
    }
  },
});

export const { addHolding } = holdingSlice.actions;

export default holdingSlice.reducer;
