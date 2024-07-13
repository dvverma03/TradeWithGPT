import { configureStore } from "@reduxjs/toolkit";
import isTradeVisibleReducer from "./isVisibleSlice";
import holdingReducer from "./holdingSlice"
import coinsReducer from "./coinsSlice"
import userReducer from "./userSlice"

const appStore = configureStore({
  reducer: {
    isTradeVisible: isTradeVisibleReducer,
    holding:holdingReducer,
    coins:coinsReducer,
    user:userReducer
  },
});

export default appStore;
