"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [min, setMin] = useState(searchParams.get("min") || "");
  const [max, setMax] = useState(searchParams.get("max") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (min) params.set("min", min);
    if (max) params.set("max", max);
    if (sort) params.set("sort", sort);
    if (category) params.set("category", category);

    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-4 items-end">
      {/* Min price */}
      <div>
        <label className="block text-sm font-medium">Min Price</label>
        <input
          type="number"
          value={min}
          onChange={(e) => setMin(e.target.value)}
          className="border rounded px-2 py-1"
        />
      </div>

      {/* Max price */}
      <div>
        <label className="block text-sm font-medium">Max Price</label>
        <input
          type="number"
          value={max}
          onChange={(e) => setMax(e.target.value)}
          className="border rounded px-2 py-1"
        />
      </div>

      {/* Sort */}
      <div>
        <label className="block text-sm font-medium">Sort</label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="">Default</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="">All</option>
          <option value="men's clothing">Men's clothing</option>
          <option value="women's clothing">Women's clothing</option>
          <option value="jewelery">Jewelery</option>
          <option value="electronics">Electronics</option>
        </select>
      </div>

      <button
        onClick={applyFilters}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Apply
      </button>
    </div>
  );
}
