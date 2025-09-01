"use client";

import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

export default function ProductPrice({
  price,
  discount = 0.2,
}: {
  price: number;
  discount?: number;
}) {
  const t = useTranslations("components.productprice");
  const oldPrice = (price * (1 + discount)).toFixed(2);

  return (
    <div className="space-y-2">
      <div className="flex items-baseline space-x-3">
        <span className="text-4xl font-bold text-gray-900">${price}</span>
        <span className="text-lg text-gray-500 line-through">${oldPrice}</span>
        {discount > 0 && (
          <Badge variant="destructive" className="text-xs">
            {t("discount", { percent: Math.round(discount * 100) })}
          </Badge>
        )}
      </div>
      <p className="text-sm text-green-600 font-medium">
        {t("freeShipping", { amount: 50 })}
      </p>
    </div>
  );
}
