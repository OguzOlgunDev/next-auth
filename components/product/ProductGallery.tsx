"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default function ProductGallery({
  image,
  title,
}: {
  image: string;
  title: string;
}) {
  return (
    <div className="space-y-4">
      <div className="aspect-square relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain p-8 hover:scale-105 transition-transform duration-500"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm hover:bg-white"
          aria-label="Add to favorites"
        >
          <Heart className="w-5 h-5" />
        </Button>
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
            <img
              src={image}
              alt={`${title} view ${i + 1}`}
              className="w-full h-full object-contain bg-white p-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
