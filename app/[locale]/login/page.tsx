"use client";

import SocialLoginButtons from "@/components/auth/SocialLoginButtons";

export default function LoginPage() {
  return (
    <div className="flex h-full items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded-xl shadow-lg w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Welcome Back
        </h1>
        <p className="text-center text-gray-500">
          Sign in to continue to the dashboard
        </p>

        {/* Sosyal giriş butonları */}
        <SocialLoginButtons />
      </div>
    </div>
  );
}
