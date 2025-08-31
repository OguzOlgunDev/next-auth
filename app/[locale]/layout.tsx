// app/[locale]/layout.tsx
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import RootProviders from "@/providers/RootProvider";
import Navbar from "@/components/navbar/Navbar";
import { Toaster } from "sonner";

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  try {
    const messages = await getMessages({ locale });

    return (
      <NextIntlClientProvider key={locale} locale={locale} messages={messages}>
        <RootProviders>
          <div className="relative">
            <Navbar />
            <Toaster richColors position="top-center" expand duration={2500} />
          </div>
          <main>{children}</main>
        </RootProviders>
      </NextIntlClientProvider>
    );
  } catch {
    notFound();
  }
}
