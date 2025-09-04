"use client";

import RatingStars from "./RatingStars";
import { useTranslations } from "next-intl";

export default function ProductHeader({
  title,
  rating = 4,
  reviews = 127,
}: {
  title: string;
  rating?: number;
  reviews?: number;
}) {
  const t = useTranslations("components.productheader");

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">
        {title}
      </h1>

      <div className="flex items-center space-x-2 mb-4">
        <RatingStars value={rating} />
        <span className="text-sm text-gray-600">
          {t("ratingWithReviews", {
            rating: rating.toFixed(1),
            reviews: t("reviews", { count: reviews }),
          })}
        </span>
      </div>
    </div>
  );
}
