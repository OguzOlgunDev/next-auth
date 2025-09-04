import { ProductCard } from "@/components/product/ProductCard";
import { getTranslations } from "next-intl/server";
import { Product } from "@/types/product";

export const revalidate = 300;

function getBaseUrl() {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  return "http://localhost:3000";
}

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  // "pages.home" namespace
  const t = await getTranslations({ locale, namespace: "pages.home" });
  const baseUrl = getBaseUrl();

  const res = await fetch(`${baseUrl}/api/products?featured=true`, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    return <p className="text-red-500">{t("fetchError")}</p>;
  }

  const featured = await res.json();

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{t("topRated")}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {featured.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
