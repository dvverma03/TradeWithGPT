import { createSlice } from "@reduxjs/toolkit";

const holdingSlice = createSlice({
  name: "coins",
  initialState: {
    coins: []
  },
  reducers: {
    addCoins: (state, action) => {
      state.coins = action.payload;
    }
  },
});

export const { addCoins } = holdingSlice.actions;

export default holdingSlice.reducer;
