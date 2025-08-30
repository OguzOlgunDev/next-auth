"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/hooks";
import { addItem, removeItem } from "@/features/cart/cartSlice";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/types/product";

export default function AddToCartButton({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  function handleAdd() {
    const qty = product.qty ?? 1; // 👈 qty geldi mi kontrol et

    dispatch(
      addItem({
        id: product.id,
        title: product.title,
        price: Number(product.price) || 0,
        image: product.image,
        qty,
      })
    );

    toast({
      title: "Sepete eklendi ✅",
      description: `${product.title} (${qty} adet) sepete eklendi.`,
      duration: 3000,
      action: (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            dispatch(removeItem(product.id));
            toast({
              title: "İşlem geri alındı ↩️",
              description: `${product.title} sepetten çıkarıldı.`,
              duration: 2000,
            });
          }}
        >
          Geri Al
        </Button>
      ),
    });
  }

  return (
    <Button onClick={handleAdd} className="w-full">
      Add to Cart
    </Button>
  );
}
