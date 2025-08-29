import { ProductCard } from "@/components/product/ProductCard";
import Filters from "@/components/product/Filters";

export const revalidate = 600;

// Ortak helper
function getBaseUrl() {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  return "http://localhost:3000"; // dev
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[]>;
}) {
  // string[] ihtimalini normalize et
  const normalized = new URLSearchParams(
    Object.entries(searchParams ?? {}).flatMap(([k, v]) =>
      Array.isArray(v) ? v.map((vv) => [k, vv]) : [[k, v]]
    )
  );

  const baseUrl = getBaseUrl();

  const res = await fetch(`${baseUrl}/api/products?${normalized.toString()}`, {
    next: { revalidate: 600 },
  });

  if (!res.ok) {
    return <p className="text-red-500">Failed to load products</p>;
  }

  const products = await res.json();

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>

      {/* Filters client component olabilir */}
      <Filters />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {products.map((p: any) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
