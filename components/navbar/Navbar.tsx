"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import LogoutButton from "../auth/LogoutButton";
import { navLinksPrivite, navLinksPublic } from "@/utils/navLinks";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  // Kullanıcı giriş durumuna göre linkler
  const links = session ? navLinksPrivite : navLinksPublic;

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white shadow relative">
      {/* Logo */}
      <div className="text-xl font-bold flex items-center gap-4">
        <Link href="/">MyApp</Link>
      </div>

      {/* Links */}
      <div className="flex items-center gap-6">
        {links.map((link) => {
          const isActive = pathname === link.href; // aktif sayfa kontrolü
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:underline ${
                isActive ? "font-semibold underline text-blue-400" : ""
              }`}
            >
              {link.label}
            </Link>
          );
        })}
        <Link href="/cart">Sepet</Link>

        {/* Dinamik buton */}
        {session ? (
          <LogoutButton />
        ) : (
          <Link href="/login" className="hover:underline">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
