import type { Metadata } from "next";
import "./globals.css";
import RootProviders from "@/providers/RootProvider";
import Navbar from "@/components/navbar/Navbar";
import { Toaster } from "sonner"; // ✅ sonner

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
      <body className="min-h-screen grid grid-rows-[auto,1fr]">
        <RootProviders>
          <div className="relative">
            <Navbar />
            <Toaster richColors position="top-center" expand duration={2500} />
          </div>
          <main>{children}</main>
        </RootProviders>
      </body>
    </html>
  );
}
