"use client";

import { Shield, Truck, RotateCcw, Star } from "lucide-react";
import { useTranslations } from "next-intl";

const icons = [Shield, Truck, RotateCcw, Star];
const colors = [
  "text-green-600",
  "text-blue-600",
  "text-purple-600",
  "text-yellow-600",
];

export default function TrustSignals() {
  const t = useTranslations("components.trustsignals");
  const items = t.raw("items") as { title: string; desc: string }[];

  return (
    <div className="grid grid-cols-2 gap-4 pt-6">
      {items.map(({ title, desc }, i) => {
        const Icon = icons[i];
        return (
          <div
            key={title}
            className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg"
          >
            <Icon className={`w-6 h-6 ${colors[i]}`} />
            <div>
              <p className="font-medium text-sm">{title}</p>
              <p className="text-xs text-gray-600">{desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
