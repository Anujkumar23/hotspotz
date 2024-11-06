import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import CartReducer from "./features/cart-slice";

export const store = configureStore({
  reducer: {
    cart: CartReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
