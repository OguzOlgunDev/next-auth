"use client";

import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import {
  increment,
  decrement,
  removeItem,
} from "../../features/cart/cartSlice";
import { useMemo } from "react";
import Image from "next/image";

export default function CartPage() {
  const items = useAppSelector((s) => s.cart.items);
  const dispatch = useAppDispatch();

  // toplam fiyatı sadece items değiştiğinde hesapla
  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items]
  );

  if (items.length === 0) {
    return (
      <div className="p-6 text-center text-gray-600">🛒 Sepetiniz boş</div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-semibold mb-6">Sepet</h1>

      <ul className="space-y-4">
        {items.map((it) => (
          <li
            key={it.id}
            className="flex items-center justify-between border rounded-lg p-4"
          >
            {/* Ürün bilgisi */}
            <div className="flex items-center gap-4">
              {it.image && (
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={it.image}
                    alt={it.title}
                    fill
                    className="object-contain rounded"
                    sizes="64px" // bu kutu hep 64px olduğundan sabit verebiliriz
                  />
                </div>
              )}

              <div>
                <div className="font-medium">{it.title}</div>
                <div className="text-sm text-gray-500">${it.price}</div>
              </div>
            </div>

            {/* Kontroller */}
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 border rounded"
                onClick={() => dispatch(decrement(it.id))}
              >
                -
              </button>
              <span className="w-8 text-center">{it.qty}</span>
              <button
                className="px-3 py-1 border rounded"
                onClick={() => dispatch(increment(it.id))}
              >
                +
              </button>
              <button
                className="ml-4 text-sm text-red-600"
                onClick={() => dispatch(removeItem(it.id))}
              >
                Kaldır
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Toplam */}
      <div className="mt-6 text-right text-lg">
        Toplam: <b>${total.toFixed(2)}</b>
      </div>
    </div>
  );
}
