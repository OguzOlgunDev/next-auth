"use client";

import type { Product } from "@/types/product";
import { useTranslations } from "next-intl";

export default function ProductSpecs({ product }: { product: Product }) {
  const t = useTranslations("components.productspecs");

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("title")}</h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-6 space-y-4">
            <Row label={t("labels.category")} value={product.category ?? "—"} />
            <Row label={t("labels.brand")} value={t("values.brand")} />
            <Row label={t("labels.sku")} value={`SKU-${product.id}`} />
            <Row
              label={t("labels.availability")}
              value={
                <span className="text-green-600">
                  {t("values.availability")}
                </span>
              }
            />
          </div>
          <div className="p-6 bg-gray-50 space-y-4">
            <Row label={t("labels.material")} value={t("values.material")} />
            <Row label={t("labels.warranty")} value={t("values.warranty")} />
            <Row label={t("labels.weight")} value={t("values.weight")} />
            <Row
              label={t("labels.dimensions")}
              value={t("values.dimensions")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
