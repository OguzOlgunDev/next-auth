"use client";

import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useTranslations } from "next-intl";

export default function SocialLoginButtons() {
  const t = useTranslations("components.socialloginbuttons");

  const providers = [
    {
      id: "auth0",
      label: t("auth0"),
      className: "bg-blue-600 text-white hover:bg-blue-700",
    },
    {
      id: "google",
      label: t("google"),
      className:
        "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100",
      icon: <FcGoogle size={22} />,
    },
    {
      id: "github",
      label: t("github"),
      className: "bg-gray-800 text-white hover:bg-black",
      icon: <FaGithub size={22} />,
    },
  ];

  return (
    <div className="space-y-3">
      {providers.map((p) => (
        <button
          key={p.id}
          onClick={() => signIn(p.id, { callbackUrl: "/" })}
          className={`flex items-center justify-center gap-2 w-full py-2 rounded-lg ${p.className}`}
        >
          {p.icon}
          <span>{p.label}</span>
        </button>
      ))}
    </div>
  );
}
