import type { Metadata } from "next";
import "./globals.css";
import RootProviders from "@/providers/RootProvider";
import Navbar from "@/components/navbar/Navbar";

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
        <RootProviders>
          <Navbar /> {/* yüksekliği kadar auto satır */}
          <main>{children}</main> {/* kalan alanı otomatik doldurur */}
        </RootProviders>
      </body>
    </html>
  );
}
