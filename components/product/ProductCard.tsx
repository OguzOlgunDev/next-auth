import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export function ProductCard({
  product,
  priority,
}: {
  product: Product;
  priority?: boolean;
}) {
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
              // Lighthouse için optimize
              priority={priority} // sadece ilk birkaç ürüne true gönder
              sizes="(max-width: 640px) 100vw,
                     (max-width: 1024px) 50vw,
                     25vw"
            />
          </div>
          <CardTitle className="text-sm line-clamp-2">
            {product.title}
          </CardTitle>
          <CardDescription>${product.price}</CardDescription>
        </CardHeader>
      </Link>
      <CardFooter>
        <AddToCartButton product={product} />
      </CardFooter>
    </Card>
  );
}
