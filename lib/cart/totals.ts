import type { CartItem } from "@/types/cart";

export function calcTotals(items: CartItem[]) {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const finalTotal = subtotal + shipping + tax;
  return { subtotal, shipping, tax, finalTotal };
}
