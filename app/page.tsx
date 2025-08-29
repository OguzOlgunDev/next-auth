// app/page.tsx (server component)
import { ProductCard } from "@/components/product/ProductCard";

export const revalidate = 300;

function getBaseUrl() {
  // PROD (Vercel) → VERCEL_URL "my-app.vercel.app" gibi gelir (protokolsüz)
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  // ENV ile manuel verdiysen
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  // DEV
  return "http://localhost:3000";
}

export default async function Home() {
  const baseUrl = getBaseUrl();

  const res = await fetch(`${baseUrl}/api/products?featured=true`, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    return <p className="text-red-500">Failed to load products</p>;
  }

  const featured = await res.json();

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Top Rated Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {featured.map((p: any, i: number) => (
          <ProductCard key={p.id} product={p} priority={i < 2} />
        ))}
      </div>
    </section>
  );
}
