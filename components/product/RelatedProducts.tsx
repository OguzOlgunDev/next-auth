import Link from "next/link";
import type { Product } from "@/types/product";

export default async function RelatedProducts({
  category,
  currentId,
}: {
  category: string;
  currentId: number;
}) {
  // Aynı kategorideki ürünleri getir
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/api/products?category=${encodeURIComponent(category)}&limit=4`,
    { next: { revalidate: 600 } }
  );

  if (!res.ok) {
    return (
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          You Might Also Like
        </h2>
        <p className="text-gray-500">No related products found.</p>
      </div>
    );
  }

  let products: Product[] = await res.json();

  // Kendisiyle aynı id’yi çıkar
  products = products.filter((p) => p.id !== currentId);

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        You Might Also Like
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/products/${p.id}`}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group block"
          >
            <div className="aspect-square bg-gray-50 relative overflow-hidden">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                {p.title}
              </h3>
              <p className="text-lg font-bold text-gray-900">${p.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
