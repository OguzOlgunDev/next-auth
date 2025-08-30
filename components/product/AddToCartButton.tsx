"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/hooks";
import { addItem, removeItem } from "@/features/cart/cartSlice";
import { toast } from "sonner";
import type { Product } from "@/types/product";

export default function AddToCartButton({ product }: { product: Product }) {
  const dispatch = useAppDispatch();

  function handleAdd() {
    const qty = product.qty ?? 1;

    dispatch(
      addItem({
        id: product.id,
        title: product.title,
        price: Number(product.price) || 0,
        image: product.image,
        qty,
      })
    );

    // Başarılı toast
    toast.success(`${product.title} (${qty} adet) sepete eklendi.`, {
      duration: 3000,
      action: {
        label: "Geri Al",
        onClick: () => {
          dispatch(removeItem(product.id));
          toast.info(`${product.title} sepetten çıkarıldı.`, {
            duration: 2000,
          });
        },
      },
    });
  }

  return (
    <Button onClick={handleAdd} className="w-full">
      Add to Cart
    </Button>
  );
}
