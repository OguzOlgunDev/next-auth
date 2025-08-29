import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/navbar/Navbar";
import AuthProvider from "@/components/auth/AuthProvider";

export const metadata: Metadata = {
  title: "Next-Auth-1",
  description:
    "Next.js + NextAuth temelli bir kimlik doğrulama ve yetkilendirme sistemi",
};

// layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen grid grid-rows-[auto,1fr]">
        <AuthProvider>
          <Navbar /> {/* yüksekliği kadar auto satır */}
          <main>{children}</main> {/* kalan alanı otomatik doldurur */}
        </AuthProvider>
      </body>
    </html>
  );
}
