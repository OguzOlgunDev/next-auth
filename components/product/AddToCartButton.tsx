"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/hooks";
import { addItem } from "@/features/cart/cartSlice";

type Product = {
  id: number;
  title: string;
  price: number | string; // bazen string gelebilir
  image?: string;
};

export default function AddToCartButton({ product }: { product: Product }) {
  const dispatch = useAppDispatch();

  function handleAdd() {
    console.log("ADDING", product, typeof product.price);

    dispatch(
      addItem({
        id: product.id,
        title: product.title,
        price: Number(product.price) || 0, // number garanti et
        image: product.image,
        qty: 1,
      })
    );
  }

  return (
    <Button onClick={handleAdd} className="w-full">
      Add to Cart
    </Button>
  );
}
