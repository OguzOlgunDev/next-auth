"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import LogoutButton from "../auth/LogoutButton";
import { navLinksPrivite, navLinksPublic } from "@/utils/navLinks";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation"; // basit: next/navigation
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import LanguageButton from "@/components/navbar/LanguageButton";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname(); // ör: "/tr/products"
  const locale = useLocale(); // ör: "tr"
  const t = useTranslations("components.navbar");

  const links = session ? navLinksPrivite : navLinksPublic;

  // Locale prefixleyen basit helper
  const L = (path: string) =>
    `/${locale}${path.startsWith("/") ? path : `/${path}`}`;

  // Aktif link kontrolü (mevcut path == locale'li hedef)
  const isActive = (href: string) => pathname === L(href);

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white shadow relative">
      {/* Logo */}
      <div className="text-xl font-bold">
        <Link href={L("/")} className="hover:text-blue-400 transition">
          OzStore
        </Link>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={L(link.href)} // ← locale'li href
            className={`transition hover:text-blue-400 ${
              isActive(link.href) ? "font-semibold text-blue-400 underline" : ""
            }`}
          >
            {t(link.key)}
          </Link>
        ))}

        <Link
          href={L("/cart")}
          className={`hover:text-blue-400 transition ${
            isActive("/cart") ? "font-semibold text-blue-400 underline" : ""
          }`}
        >
          {t("cart")}
        </Link>

        {session ? (
          <LogoutButton />
        ) : (
          <Link
            href={L("/login")}
            className={`hover:text-blue-400 transition ${
              isActive("/login") ? "font-semibold text-blue-400 underline" : ""
            }`}
          >
            {t("login")}
          </Link>
        )}

        {/* Language (Desktop) */}
        <LanguageButton mode="desktop" />
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6 text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-gray-900 text-white">
            <SheetHeader>
              <SheetTitle className="text-white">MyApp</SheetTitle>
            </SheetHeader>

            <div className="mt-6 flex flex-col gap-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={L(link.href)}
                  className={`transition hover:text-blue-400 ${
                    isActive(link.href)
                      ? "font-semibold text-blue-400 underline"
                      : ""
                  }`}
                >
                  {t(link.key)}
                </Link>
              ))}

              <Link
                href={L("/cart")}
                className="hover:text-blue-400 transition"
              >
                {t("cart")}
              </Link>

              {session ? (
                <LogoutButton />
              ) : (
                <Link
                  href={L("/login")}
                  className="hover:text-blue-400 transition"
                >
                  {t("login")}
                </Link>
              )}

              {/* Language (Mobile) */}
              <LanguageButton mode="mobile" className="mt-4" />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
