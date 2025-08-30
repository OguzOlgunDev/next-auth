import type { Product } from "@/types/product";

export default function ProductSpecs({ product }: { product: Product }) {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Product Specifications
      </h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-6 space-y-4">
            <Row label="Category" value={product.category ?? "—"} />
            <Row label="Brand" value="Premium Brand" />
            <Row label="SKU" value={`SKU-${product.id}`} />
            <Row
              label="Availability"
              value={<span className="text-green-600">In Stock</span>}
            />
          </div>
          <div className="p-6 bg-gray-50 space-y-4">
            <Row label="Material" value="Premium Quality" />
            <Row label="Warranty" value="2 Years" />
            <Row label="Weight" value="1.2 kg" />
            <Row label="Dimensions" value="25×15×10 cm" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
