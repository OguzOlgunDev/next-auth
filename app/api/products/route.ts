import { NextResponse } from "next/server";

export const revalidate = 600; // Route Handler seviyesinde cache bildirimi

export async function GET(req: Request) {
  try {
    // Base URL hardcode ETMEYİN
    const { searchParams } = new URL(req.url);

    const featured = searchParams.get("featured");
    const limit = searchParams.get("limit");
    const sort = searchParams.get("sort");
    const category = searchParams.get("category");
    const min = searchParams.get("min");
    const max = searchParams.get("max");

    const res = await fetch("https://fakestoreapi.com/products", {
      next: { revalidate: 600 }, // uzak isteği de revalidate edelim
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch products" },
        { status: res.status }
      );
    }

    let products = await res.json();

    if (featured === "true") {
      products = [...products]
        .sort((a: any, b: any) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0))
        .slice(0, 4);
      return NextResponse.json(products, { status: 200 });
    }

    if (category) {
      products = products.filter((p: any) => p.category === category);
    }

    const minPrice = min ? Number(min) : null;
    const maxPrice = max ? Number(max) : null;

    if (minPrice !== null)
      products = products.filter((p: any) => p.price >= minPrice);
    if (maxPrice !== null)
      products = products.filter((p: any) => p.price <= maxPrice);

    if (sort === "price_asc") {
      products = products.sort((a: any, b: any) => a.price - b.price);
    } else if (sort === "price_desc") {
      products = products.sort((a: any, b: any) => b.price - a.price);
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
