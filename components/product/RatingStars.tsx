import { Star } from "lucide-react";

export default function RatingStars({
  value = 0,
  outOf = 5,
  size = 5,
}: {
  value?: number;
  outOf?: number;
  size?: number;
}) {
  return (
    <div className="flex items-center">
      {[...Array(outOf)].map((_, i) => (
        <Star
          key={i}
          className={`w-${size} h-${size} ${
            i < Math.round(value)
              ? "text-yellow-400 fill-current"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}
