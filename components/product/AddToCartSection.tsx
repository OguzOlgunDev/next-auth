"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Share } from "lucide-react";
import AddToCartButton from "@/components/product/AddToCartButton";
import type { Product } from "@/types/product";
import { useTranslations } from "next-intl";

export default function AddToCartSection({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const t = useTranslations("components.addtocartsection");

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            {t("quantity")}
          </label>
          <select
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
      </div>

      <AddToCartButton product={{ ...product, qty }} />

      <div className="flex space-x-3">
        <Button variant="outline" className="flex-1">
          <Heart className="w-4 h-4 mr-2" />
          {t("wishlist")}
        </Button>
        <Button variant="outline" size="icon" aria-label={t("share")}>
          <Share className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
