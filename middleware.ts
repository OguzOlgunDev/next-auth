import createMiddleware from "next-intl/middleware";
import i18n from "./next-intl.config";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

const intlMiddleware = createMiddleware(i18n);

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // 🌍 Extract locale from pathname (e.g., "/tr/favorites" -> "tr")
  const segments = pathname.split("/");
  const locale = segments[1] || "tr"; // Default to "tr" if no locale found
  const normalizedPath =
    segments.length > 2 ? `/${segments.slice(2).join("/")}` : "/";

  const protectedPaths = ["/favorites", "/admin"];
  const isProtected = protectedPaths.some((path) =>
    normalizedPath.startsWith(path)
  );

  // 🔑 If logged in, don't allow access to login page
  if (normalizedPath === "/login" && token) {
    return NextResponse.redirect(new URL(`/${locale}`, req.url));
  }

  // 🔑 If not logged in and accessing protected path → redirect to login
  if (isProtected && !token) {
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }

  // 🔑 Admin control (only specific Gmail can access)
  if (normalizedPath.startsWith("/admin")) {
    const email = (token as any)?.email;
    const allowedAdmin = "tiredcavalry@gmail.com"; // Replace with your email
    if (email !== allowedAdmin) {
      return NextResponse.redirect(new URL(`/${locale}`, req.url));
    }
  }

  // 🌍 Run i18n middleware last
  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
