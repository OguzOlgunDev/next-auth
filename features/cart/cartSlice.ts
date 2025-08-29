import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Sepette tutulacak ürün tipi
export type CartItem = {
  id: number;
  title: string;
  price: number;
  image?: string;
  qty: number;
};

// State tipi
type CartState = {
  items: CartItem[];
};

// Başlangıç state
const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Ürün ekle
    addItem(state, action: PayloadAction<CartItem>) {
      const found = state.items.find((i) => i.id === action.payload.id);
      if (found) {
        found.qty += action.payload.qty;
      } else {
        state.items.push(action.payload);
      }
    },

    // Miktarı arttır
    increment(state, action: PayloadAction<number>) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.qty++;
    },

    // Miktarı azalt (en az 1 kalır)
    decrement(state, action: PayloadAction<number>) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.qty = Math.max(1, item.qty - 1);
    },

    // Ürünü tamamen sepetten kaldır
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },

    // Sepeti temizle
    clearCart(state) {
      state.items = [];
    },
  },
});

// Action'ları export et
export const { addItem, increment, decrement, removeItem, clearCart } =
  cartSlice.actions;

// Reducer'ı export et
export default cartSlice.reducer;
