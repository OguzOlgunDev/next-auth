"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Shield, Truck } from "lucide-react";
import { useTranslations } from "next-intl";

export default function CartEmpty() {
  const t = useTranslations("components.cartempty");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-16 h-16 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            {t("description")}
          </p>
          <div className="space-y-4">
            <Link href="/products">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                {t("startShopping")}
              </Button>
            </Link>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <span className="flex items-center">
                <Shield className="w-4 h-4 mr-1" />
                {t("secureCheckout")}
              </span>
              <span className="flex items-center">
                <Truck className="w-4 h-4 mr-1" />
                {t("freeShipping")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
