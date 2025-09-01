// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // ⚡ hızlı render için önemli
});

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
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen grid grid-rows-[auto,1fr]`}
      >
        {children}
      </body>
    </html>
  );
}
