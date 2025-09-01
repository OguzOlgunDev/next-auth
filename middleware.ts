// middleware.ts
import createMiddleware from "next-intl/middleware";
import i18n from "./next-intl.config";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

// 🌍 i18n middleware
const intlMiddleware = createMiddleware(i18n);

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname, locale } = req.nextUrl;

  const protectedPaths = ["/fvorites", "/admin"];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  // 🔑 Eğer login sayfasına girmişse ve zaten token varsa → locale koruyarak anasayfaya
  if (pathname === "/login" && token) {
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url);
  }

  // 🔑 Eğer protected path'e girmiş ama token yoksa → locale koruyarak login'e
  if (isProtected && !token) {
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}/login`;
    return NextResponse.redirect(url);
  }

  // 🔑 Eğer admin path'inde ama role admin değilse → locale koruyarak anasayfaya
  if (pathname.startsWith("/admin")) {
    const role = (token as any)?.role;
    if (role !== "admin") {
      const url = req.nextUrl.clone();
      url.pathname = `/${locale}`;
      return NextResponse.redirect(url);
    }
  }

  // 🌍 En son i18n middleware çalışsın
  return intlMiddleware(req);
}

// ✅ tüm path'leri locale-aware yap
export const config = {
  matcher: [
    "/((?!api|_next|.*\\..*).*)", // bütün route'ları yakala
  ],
};
