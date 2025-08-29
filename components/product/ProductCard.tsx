"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="hover:shadow-md transition">
      <Link href={`/products/${product.id}`}>
        <CardHeader>
          <div className="aspect-square relative mb-3">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain"
            />
          </div>
          <CardTitle className="text-sm line-clamp-2">
            {product.title}
          </CardTitle>
          <CardDescription>${product.price}</CardDescription>
        </CardHeader>
      </Link>
      <CardFooter>
        <Button className="w-full">Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}
