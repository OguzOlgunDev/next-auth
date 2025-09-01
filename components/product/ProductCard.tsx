"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import RatingStars from "@/components/product/RatingStars";
import AddToCartButton from "@/components/product/AddToCartButton";
import WishlistButton from "@/components/product/WhishlistButton";

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
  isLCP?: boolean; // LCP için öncelik
};

export function ProductCard({ product }: { product: Product }) {
  const t = useTranslations("components.productcard");
  const locale = useLocale();

  const formatPrice = useMemo(
    () => (price: number) =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
      }).format(price),
    [locale]
  );

  return (
    <Card className="group border-0 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden bg-white">
      <CardContent className="p-0">
        <Link href={`/products/${product.id}`} className="block">
          <div className="relative aspect-square overflow-hidden bg-gray-50">
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 100vw,
                     (max-width: 1024px) 50vw,
                     (max-width: 1280px) 33vw,
                     25vw"
              className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.02] will-change-transform"
              quality={70} // ✅ kaliteyi biraz yukarı aldık
              placeholder="empty" // ✅ 404 sorununu kaldırdık
              priority={product.isLCP}
              fetchPriority={product.isLCP ? "high" : "auto"}
            />
            <div className="absolute top-2 right-2 z-10">
              <WishlistButton
                productId={product.id}
                productTitle={product.title}
              />
            </div>
          </div>

          <div className="px-4 pt-4 space-y-3">
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
          </div>
        </Link>

        <div className="px-4 pb-4 pt-2">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.price * 1.25)}
                </span>
                <span className="text-xs text-red-500 font-medium">-25%</span>
              </div>
              <p className="text-xs text-green-600 font-medium">
                {t("freeShipping")}
              </p>
            </div>
          </div>

          <div className="mt-3">
            <AddToCartButton product={{ ...product, qty: 1 }} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
