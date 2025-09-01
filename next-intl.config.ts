// next-intl.config.ts
import { defineRouting } from "next-intl/routing";

export default defineRouting({
  locales: ["en", "tr"],
  defaultLocale: "tr",
  // default locale'ın da URL prefix’i alması için:
  localePrefix: "always",
  // opsiyonel: otomatik tarayıcı dil saptaması
  localeDetection: true,
});
