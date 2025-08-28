"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useMemo } from "react";

export default function LogoutButton() {
  const { data: session, status } = useSession();

  // Login değilse hiç gösterme
  if (status !== "authenticated") return null;

  const nameOrEmail = session.user?.name ?? session.user?.email ?? "User";
  const initials = useMemo(
    () => (nameOrEmail.charAt(0) || "U").toUpperCase(),
    [nameOrEmail]
  );

  const handleLogout = async () => {
    await signOut({ redirect: false }); // NextAuth cookie’lerini temizle

    const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
    const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;
    const returnTo = window.location.origin;

    // Auth0 tarafını da kapat (env eksikse en azından köke dön)
    if (domain && clientId) {
      window.location.href =
        `https://${domain}/v2/logout?client_id=${clientId}` +
        `&returnTo=${encodeURIComponent(returnTo)}`;
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="flex items-center gap-3">
      {session.user?.image ? (
        <Image
          src={session.user.image}
          alt={`${nameOrEmail} avatar`}
          width={32}
          height={32}
          className="rounded-full border"
        />
      ) : (
        <div
          aria-label="User avatar"
          className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium"
        >
          {initials}
        </div>
      )}

      <span
        title={nameOrEmail}
        className="max-w-[160px] truncate text-sm text-gray-700"
      >
        {nameOrEmail}
      </span>

      <button
        onClick={handleLogout}
        className="px-3 py-2 rounded bg-red-600 text-white text-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
        aria-label="Logout"
      >
        Logout
      </button>
    </div>
  );
}
