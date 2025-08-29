import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // query parametreleri al
    const featured = searchParams.get("featured"); // ?featured=true
    const limit = searchParams.get("limit"); // ?limit=4 gibi opsiyonel
    const sort = searchParams.get("sort"); // ?sort=rating

    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch products" },
        { status: res.status }
      );
    }

    let products = await res.json();

    // Featured için rating'e göre sırala → en yüksek 4 ürünü seç
    if (featured === "true") {
      products = products
        .sort((a: any, b: any) => b.rating.rate - a.rating.rate)
        .slice(0, 4);
    }

    // Limit parametresi varsa uygula
    if (limit) {
      products = products.slice(0, Number(limit));
    }

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
