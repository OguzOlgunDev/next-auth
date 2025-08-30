"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { X, RotateCcw } from "lucide-react";

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

  const clearFilters = () => {
    setMin("");
    setMax("");
    setSort("");
    setCategory("");
    router.push("/products");
  };

  const hasActiveFilters = min || max || sort || category;

  const categories = [
    { value: "men's clothing", label: "Men's Clothing" },
    { value: "women's clothing", label: "Women's Clothing" },
    { value: "jewelery", label: "Jewelry" },
    { value: "electronics", label: "Electronics" },
  ];

  return (
    <div className="space-y-6">
      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Active Filters</Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {category && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {categories.find((c) => c.value === category)?.label}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-red-500"
                  onClick={() => setCategory("")}
                />
              </Badge>
            )}
            {min && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Min: ${min}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-red-500"
                  onClick={() => setMin("")}
                />
              </Badge>
            )}
            {max && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Max: ${max}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-red-500"
                  onClick={() => setMax("")}
                />
              </Badge>
            )}
            {sort && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {sort === "price_asc"
                  ? "Price: Low to High"
                  : sort === "price_desc"
                  ? "Price: High to Low"
                  : sort}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-red-500"
                  onClick={() => setSort("")}
                />
              </Badge>
            )}
          </div>
          <Separator />
        </div>
      )}

      {/* Price Range */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Price Range</Label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="min-price" className="text-xs text-gray-500">
              Min Price
            </Label>
            <Input
              id="min-price"
              type="number"
              placeholder="$0"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="max-price" className="text-xs text-gray-500">
              Max Price
            </Label>
            <Input
              id="max-price"
              type="number"
              placeholder="$1000"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Category */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Sort */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Sort By</Label>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger>
            <SelectValue placeholder="Default" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Default</SelectItem>
            <SelectItem value="price_asc">Price: Low to High</SelectItem>
            <SelectItem value="price_desc">Price: High to Low</SelectItem>
            <SelectItem value="name_asc">Name: A to Z</SelectItem>
            <SelectItem value="name_desc">Name: Z to A</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Apply Button */}
      <Button
        onClick={applyFilters}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
      >
        Apply Filters
      </Button>

      {/* Quick Filters */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Quick Filters</Label>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setMin("0");
              setMax("50");
              applyFilters();
            }}
            className="text-xs"
          >
            Under $50
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setMin("50");
              setMax("100");
              applyFilters();
            }}
            className="text-xs"
          >
            $50 - $100
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setMin("100");
              setMax("");
              applyFilters();
            }}
            className="text-xs"
          >
            Over $100
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSort("price_asc");
              applyFilters();
            }}
            className="text-xs"
          >
            Best Value
          </Button>
        </div>
      </div>
    </div>
  );
}
