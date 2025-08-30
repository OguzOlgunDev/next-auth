import { Badge } from "@/components/ui/badge";
import RatingStars from "./RatingStars";

export default function ProductHeader({
  title,
  rating = 4,
  reviews = 127,
}: {
  title: string;
  rating?: number;
  reviews?: number;
}) {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">
        {title}
      </h1>

      <div className="flex items-center space-x-2 mb-4">
        <RatingStars value={rating} />
        <span className="text-sm text-gray-600">
          ({rating.toFixed(1)}) • {reviews} reviews
        </span>
      </div>
    </div>
  );
}
