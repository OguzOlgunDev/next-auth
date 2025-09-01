// app/[locale]/products/page.tsx
import { getTranslations } from "next-intl/server";
import { ProductCard } from "@/components/product/ProductCard";
import Filters from "@/components/product/Filters";
import { Search, Grid, List, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const revalidate = 600; // ISR

type SearchParams = Record<string, string | string[]>;

// ✅ Base URL helper
function getBaseUrl() {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  return "http://localhost:3000"; // dev için
}

function toSearchParams(searchParams?: SearchParams) {
  return new URLSearchParams(
    Object.entries(searchParams ?? {}).flatMap(([k, v]) =>
      Array.isArray(v) ? v.map((vv) => [k, vv]) : [[k, v]]
    )
  ).toString();
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const t = await getTranslations("pages.products");

  const qs = toSearchParams(searchParams);
  const baseUrl = getBaseUrl();

  // ✅ Absolute URL kullandık
  const res = await fetch(`${baseUrl}/api/products?${qs}`, {
    next: { revalidate: 600 },
  });

  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {t("failedTitle")}
          </h1>
          <p className="text-gray-600">{t("failedDescription")}</p>
        </div>
      </div>
    );
  }

  const products = await res.json();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder={t("searchPlaceholder")}
              className="pl-12 h-14 text-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <div className="flex items-center mb-6">
                <SlidersHorizontal className="w-5 h-5 mr-2 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  {t("filters")}
                </h2>
              </div>
              <Filters />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">
                  {products.length}
                </span>{" "}
                {t("productsFound", { count: products.length })}
              </p>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="hidden sm:flex"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="hidden sm:flex">
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product: any, idx: number) => (
                  <ProductCard
                    key={product.id}
                    product={{ ...product, isLCP: idx === 0 }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t("noProductsTitle")}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t("noProductsDescription")}
                </p>
                <Button variant="outline">{t("clearFilters")}</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata() {
  const t = await getTranslations("pages.products");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}
