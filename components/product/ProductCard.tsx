"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import RatingStars from "@/components/product/RatingStars";
import AddToCartButton from "@/components/product/AddToCartButton";
import WishlistButton from "@/components/product/WhishlistButton"; // ✅

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  rating?: {
    rate: number;
    count: number;
  };
};

export function ProductCard({ product }: { product: Product }) {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

  return (
    <Card className="group border-0 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden bg-white">
      <Link href={`/products/${product.id}`} className="block">
        <CardContent className="p-0">
          {/* Görsel */}
          <div className="relative aspect-square overflow-hidden bg-gray-50">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain p-4 group-hover:scale-[1.02] transition-transform duration-500"
            />

            {/* ✅ WishlistButton */}
            <WishlistButton
              productId={product.id}
              productTitle={product.title}
            />
          </div>

          {/* Bilgi */}
          <div className="p-4 space-y-3">
            {product.rating && (
              <div className="flex items-center space-x-2">
                <RatingStars value={product.rating.rate} outOf={5} size={3} />
                <span className="text-xs text-gray-600">
                  ({product.rating.count})
                </span>
              </div>
            )}

            <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
              {product.title}
            </h3>

            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center justify-between pt-2">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(product.price * 1.25)}
                  </span>
                </div>
                <p className="text-xs text-green-600 font-medium">
                  Free shipping
                </p>
              </div>
            </div>

            <AddToCartButton product={{ ...product, qty: 1 }} />
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
