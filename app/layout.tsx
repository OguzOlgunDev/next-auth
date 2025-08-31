// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next-Auth-1",
  description:
    "Next.js + NextAuth temelli bir kimlik doğrulama ve yetkilendirme sistemi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="min-h-screen grid grid-rows-[auto,1fr]">{children}</body>
    </html>
  );
}
