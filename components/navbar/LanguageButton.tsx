"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Mode = "desktop" | "mobile";
type Props = { mode: Mode; className?: string };

const LOCALES = ["en", "tr"] as const;

// /tr/... veya /en/... ilk segmentini hedef dile çevir
function switchLocale(path: string, target: string) {
  if (!path || path === "/") return `/${target}`;
  const re = /^\/(en|tr)(?=\/|$)/;
  return re.test(path) ? path.replace(re, `/${target}`) : `/${target}${path}`;
}

export default function LanguageButton({ mode, className }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale();

  const hrefBase = useMemo(() => {
    const qs = searchParams.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  }, [pathname, searchParams]);

  const isActive = (l: string) => l === locale;

  if (mode === "desktop") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center gap-2 ${className ?? ""}`}
          >
            <Globe className="w-4 h-4" />
            <span className="hidden lg:inline">Language</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-40">
          <DropdownMenuLabel className="text-xs">
            Select language
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {LOCALES.map((l) => (
            <DropdownMenuItem key={l} asChild>
              <Link
                href={switchLocale(hrefBase, l)}
                className="flex items-center justify-between w-full"
                aria-current={isActive(l) ? "true" : undefined}
              >
                {l === "en" ? "English" : "Türkçe"}
                {isActive(l) && <Check className="w-4 h-4" />}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // mobile
  return (
    <div className={className}>
      <div className="flex items-center gap-2 text-sm mb-2">
        <Globe className="w-4 h-4" />
        <span className="opacity-80">Language</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {LOCALES.map((l) => (
          <Link
            key={l}
            href={switchLocale(hrefBase, l)}
            className={`px-3 py-2 rounded-md text-center border transition ${
              isActive(l)
                ? "bg-white text-gray-900 border-white"
                : "border-white/30 hover:bg-white/10"
            }`}
            aria-current={isActive(l) ? "true" : undefined}
          >
            {l.toUpperCase()}
          </Link>
        ))}
      </div>
    </div>
  );
}
