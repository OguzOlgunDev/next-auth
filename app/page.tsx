import { ProductCard } from "@/components/product/ProductCard";

export const revalidate = 600;

export default async function Home() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?featured=true`,
    {
      next: { revalidate: 600 },
    }
  );

  if (!res.ok) {
    return <p className="text-red-500">Failed to load products</p>;
  }

  const featured = await res.json();

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Top Rated Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {featured.map((p: any) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
