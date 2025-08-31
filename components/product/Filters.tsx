"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useMemo } from "react";
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
import { useTranslations } from "next-intl";

export default function Filters() {
  const t = useTranslations("components.filters");
  const router = useRouter();
  const searchParams = useSearchParams();

  const [min, setMin] = useState(searchParams.get("min") || "");
  const [max, setMax] = useState(searchParams.get("max") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");

  const categories = useMemo(
    () => [
      { value: "men's clothing", label: t("categories.men") },
      { value: "women's clothing", label: t("categories.women") },
      { value: "jewelery", label: t("categories.jewelery") },
      { value: "electronics", label: t("categories.electronics") },
    ],
    [t]
  );

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (min) params.set("min", min);
    if (max) params.set("max", max);
    if (sort && sort !== "all") params.set("sort", sort);
    if (category && category !== "all") params.set("category", category);
    router.push(`/products?${params.toString()}`);
  };

  const clearFilters = () => {
    setMin("");
    setMax("");
    setSort("");
    setCategory("");
    router.push("/products");
  };

  const hasActiveFilters =
    Boolean(min) ||
    Boolean(max) ||
    (Boolean(sort) && sort !== "all") ||
    (Boolean(category) && category !== "all");

  // sort label'ı i18n üzerinden üret
  const sortLabel =
    sort === "price_asc"
      ? t("sort.priceAsc")
      : sort === "price_desc"
      ? t("sort.priceDesc")
      : sort === "name_asc"
      ? t("sort.nameAsc")
      : sort === "name_desc"
      ? t("sort.nameDesc")
      : t("sort.default");

  return (
    <div className="space-y-6">
      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">{t("active")}</Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              {t("clearAll")}
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {category && category !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {t("badge.category", {
                  label:
                    categories.find((c) => c.value === category)?.label ?? "",
                })}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-red-500"
                  onClick={() => setCategory("")}
                />
              </Badge>
            )}

            {min && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {t("badge.min", { value: min })}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-red-500"
                  onClick={() => setMin("")}
                />
              </Badge>
            )}

            {max && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {t("badge.max", { value: max })}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-red-500"
                  onClick={() => setMax("")}
                />
              </Badge>
            )}

            {sort && sort !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {t("badge.sort", { label: sortLabel })}
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
        <Label className="text-sm font-medium">{t("priceRange")}</Label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="min-price" className="text-xs text-gray-500">
              {t("minLabel")}
            </Label>
            <Input
              id="min-price"
              type="number"
              placeholder={t("minPlaceholder")}
              value={min}
              onChange={(e) => setMin(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="max-price" className="text-xs text-gray-500">
              {t("maxLabel")}
            </Label>
            <Input
              id="max-price"
              type="number"
              placeholder={t("maxPlaceholder")}
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
        <Label className="text-sm font-medium">{t("category")}</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder={t("allCategories")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("allCategories")}</SelectItem>
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
        <Label className="text-sm font-medium">{t("sortBy")}</Label>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger>
            <SelectValue placeholder={t("sort.default")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("sort.default")}</SelectItem>
            <SelectItem value="price_asc">{t("sort.priceAsc")}</SelectItem>
            <SelectItem value="price_desc">{t("sort.priceDesc")}</SelectItem>
            <SelectItem value="name_asc">{t("sort.nameAsc")}</SelectItem>
            <SelectItem value="name_desc">{t("sort.nameDesc")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Apply Button */}
      <Button
        onClick={applyFilters}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
      >
        {t("apply")}
      </Button>

      {/* Quick Filters */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">{t("quickFilters")}</Label>
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
            {t("under50")}
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
            {t("fiftyToHundred")}
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
            {t("over100")}
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
            {t("bestValue")}
          </Button>
        </div>
      </div>
    </div>
  );
}
