"use client";

import WishlistButton from "@/components/product/WhishlistButton";
import type { Product } from "@/types/product";
import Image from "next/image";

export default function ProductGallery({ product }: { product: Product }) {
  const { id, image, title } = product;

  return (
    <div className="space-y-4">
      <div className="aspect-square relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
        <Image
          src={image}
          alt={title}
          width={600}
          height={600}
          className="w-full h-full object-contain p-8 hover:scale-105 transition-transform duration-500"
        />

        {/* ✅ WishlistButton id + title alıyor */}
        <WishlistButton productId={id} productTitle={title} />
      </div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`aspect-square rounded-lg overflow-hidden border-2 cursor-pointer hover:border-blue-500 transition-colors ${
              i === 0 ? "border-blue-500" : "border-gray-200"
            }`}
          >
            <Image
              src={image}
              alt={`${title} view ${i + 1}`}
              width={150}
              height={150}
              className="w-full h-full object-contain bg-white p-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
