"use client";

import { Button } from "@/components/ui/button";

export default function AddToCartButton({ productId }: { productId: number }) {
  function handleAdd() {
    // TODO: add to cart logic
    console.log("Add to cart", productId);
  }

  return (
    <Button onClick={handleAdd} className="w-full">
      Add to Cart
    </Button>
  );
}
