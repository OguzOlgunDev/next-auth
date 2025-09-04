import { NextResponse } from "next/server";
import { Product } from "@/types/product";

export const revalidate = 600;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const featured = searchParams.get("featured");
    const limit = searchParams.get("limit");
    const sort = searchParams.get("sort");
    const category = searchParams.get("category");
    const min = searchParams.get("min");
    const max = searchParams.get("max");

    const res = await fetch("https://fakestoreapi.com/products", {
      next: { revalidate: 600 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch products" },
        { status: res.status }
      );
    }

    let products: Product[] = await res.json();

    if (featured === "true") {
      products = [...products]
        .sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0))
        .slice(0, 4);
      return NextResponse.json(products, { status: 200 });
    }

    if (category) {
      products = products.filter((p) => p.category === category);
    }

    const minPrice = min ? Number(min) : null;
    const maxPrice = max ? Number(max) : null;

    if (minPrice !== null) {
      products = products.filter((p) => p.price >= minPrice);
    }
    if (maxPrice !== null) {
      products = products.filter((p) => p.price <= maxPrice);
    }

    if (sort === "price_asc") {
      products = products.sort((a, b) => a.price - b.price);
    } else if (sort === "price_desc") {
      products = products.sort((a, b) => b.price - a.price);
    }

    if (limit) {
      products = products.slice(0, Number(limit));
    }

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
