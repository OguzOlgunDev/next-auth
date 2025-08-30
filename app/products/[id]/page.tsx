import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import Breadcrumb from "@/components/product/Breadcrumb";
import ProductGallery from "@/components/product/ProductGallery";
import ProductHeader from "@/components/product/ProductHeader";
import ProductPrice from "@/components/product/ProductPrice";
import ProductFeatures from "@/components/product/ProductFeatures";
import AddToCartSection from "@/components/product/AddToCartSection";
import TrustSignals from "@/components/product/TrustSignals";
import ProductSpecs from "@/components/product/ProductSpecs";
import Reviews from "@/components/product/Reviews";
import RelatedProducts from "@/components/product/RelatedProducts";
import type { Product } from "@/types/product";

// ✅ Metadata
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${params.id}`,
      {
        next: { revalidate: 600 },
      }
    );

    if (!res.ok) {
      return {
        title: "Product Not Found | My Store",
        description: "This product could not be found.",
      };
    }

    const product: Product = await res.json();
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
    {
      next: { revalidate: 600 },
    }
  );

  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Product Not Found
          </h1>
          <p className="text-gray-600">
            The product you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const product: Product = await res.json();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 p-6">
        <Breadcrumb title={product.title} />
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image Section */}
          <ProductGallery product={product} />

          {/* Product Information Section */}
          <div className="space-y-6">
            <ProductHeader title={product.title} rating={4} reviews={127} />
            <ProductPrice price={product.price} discount={0.2} />

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-3">
                Product Description
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {product.description}
              </p>
              <p className="text-gray-600 text-sm">
                This premium product combines quality craftsmanship with modern
                design, offering exceptional value and performance.
              </p>
            </div>

            <ProductFeatures />
            <Separator />
            <AddToCartSection product={product} />
            <TrustSignals />
          </div>
        </div>

        <ProductSpecs product={product} />
        <Reviews />
        <RelatedProducts category={product.category!} currentId={product.id} />
      </div>
    </div>
  );
}
