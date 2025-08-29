import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";

export const makeStore = () =>
  configureStore({
    reducer: { cart: cartReducer },
  });

export type RootState = ReturnType<ReturnType<typeof makeStore>["getState"]>;
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];
