"use client";

import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const providers = [
  {
    id: "auth0",
    label: "Login with Auth0",
    className: "bg-blue-600 text-white hover:bg-blue-700",
  },
  {
    id: "google",
    label: "Login with Google",
    className:
      "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100",
    icon: <FcGoogle size={22} />,
  },
  {
    id: "github",
    label: "Login with GitHub",
    className: "bg-gray-800 text-white hover:bg-black",
    icon: <FaGithub size={22} />,
  },
];

export default function SocialLoginButtons() {
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
