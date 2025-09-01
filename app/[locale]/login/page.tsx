"use client";

import SocialLoginButtons from "@/components/auth/SocialLoginButtons";
import { Lock } from "lucide-react";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const t = useTranslations("pages.login");

  return (
    <div className="flex h-full items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded-xl shadow-lg w-full max-w-md space-y-6 h-1/2 flex-col flex justify-center">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <Lock className="w-7 h-7" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-800">
          {t("title")}
        </h1>
        <p className="text-center text-gray-500">{t("subtitle")}</p>

        {/* Sosyal giriş butonları */}
        <SocialLoginButtons />
      </div>
    </div>
  );
}
