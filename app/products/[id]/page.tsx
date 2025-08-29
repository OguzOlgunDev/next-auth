import { Metadata } from "next";

// ✅ Metadata
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${params.id}`,
      { next: { revalidate: 600 } }
    );

    if (!res.ok) {
      return {
        title: "Product Not Found | My Store",
        description: "This product could not be found.",
      };
    }

    const product = await res.json();
    return {
      title: `${product.title} | My Store`,
      description:
        product.description?.slice(0, 160) ??
        "Check out this product on My Store.",
      openGraph: {
        title: product.title,
        description: product.description,
        images: [{ url: product.image }],
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/products/${params.id}`,
      },
      twitter: {
        card: "summary_large_image",
        title: product.title,
        description: product.description,
        images: [product.image],
      },
    };
  } catch {
    return {
      title: "Error | My Store",
      description: "There was a problem loading this product.",
    };
  }
}

// ✅ Page Component
export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${params.id}`,
    { next: { revalidate: 600 } }
  );

  if (!res.ok) {
    return <p className="text-red-500">Failed to load product</p>;
  }

  const product = await res.json();

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-80 object-contain rounded-lg shadow"
        />
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="mb-4 text-gray-700">{product.description}</p>
          <p className="text-xl font-semibold">${product.price}</p>
        </div>
      </div>
    </section>
  );
}
