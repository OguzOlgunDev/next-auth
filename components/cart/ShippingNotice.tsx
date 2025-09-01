"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Truck } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ShippingNotice({ total }: { total: number }) {
  const t = useTranslations("components.shippingnotice");

  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <Truck className="w-5 h-5 text-blue-600" />
          <div>
            {total >= 50 ? (
              <p className="text-sm font-medium text-blue-800">
                {t("freeShippingQualified")}
              </p>
            ) : (
              <p className="text-sm font-medium text-blue-800">
                {t("addMore", { amount: (50 - total).toFixed(2) })}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
