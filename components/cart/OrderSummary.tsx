"use client";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreditCard, Shield, Truck } from "lucide-react";
import { formatPrice } from "@/lib/cart/money";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

type Props = {
  itemCount: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
};

export default function OrderSummary({
  itemCount,
  subtotal,
  shipping,
  tax,
  total,
}: Props) {
  const t = useTranslations("components.ordersummary");

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        {t("orderSummary")}
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            {t("subtotal")} ({itemCount}{" "}
            {itemCount === 1 ? t("item") : t("items")})
          </span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">{t("shipping")}</span>
          <span
            className={`font-medium ${shipping === 0 ? "text-green-600" : ""}`}
          >
            {shipping === 0 ? t("free") : formatPrice(shipping)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">{t("tax")}</span>
          <span className="font-medium">{formatPrice(tax)}</span>
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-bold">
          <span>{t("total")}</span>
          <span className="text-gray-900">{formatPrice(total)}</span>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 h-12"
          onClick={() =>
            toast.success(t("toastProceeding"), {
              description: t("toastRedirecting"),
            })
          }
        >
          <CreditCard className="w-4 h-4 mr-2" />
          {t("proceedCheckout")}
        </Button>

        <Button variant="outline" className="w-full py-3 h-12" asChild>
          <Link href="/products">{t("continueShopping")}</Link>
        </Button>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="space-y-3 text-xs text-gray-600">
          <div className="flex items-center">
            <Shield className="w-4 h-4 mr-2 text-green-600" />
            <span>{t("secureCheckout")}</span>
          </div>
          <div className="flex items-center">
            <Truck className="w-4 h-4 mr-2 text-blue-600" />
            <span>{t("freeShipping")}</span>
          </div>
          <div className="flex items-center">
            <CreditCard className="w-4 h-4 mr-2 text-purple-600" />
            <span>{t("paymentOptions")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
