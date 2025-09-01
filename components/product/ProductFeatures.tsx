"use client";

import { useTranslations } from "next-intl";

export default function ProductFeatures() {
  const t = useTranslations("components.productfeatures");
  const features: string[] = t.raw("list"); // list array olarak alınıyor

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">{t("title")}</h3>
      <ul className="space-y-2">
        {features.map((f) => (
          <li key={f} className="flex items-center text-gray-700">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}
