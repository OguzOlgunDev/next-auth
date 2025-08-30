"use client";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Shield, Truck } from "lucide-react";
import { formatPrice } from "@/lib/cart/money";
import { toast } from "sonner";

type Props = {
  itemCount: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
};

export default function OrderSummary({
  itemCount,
  subtotal,
  shipping,
  tax,
  total,
}: Props) {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Order Summary
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
          </span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span
            className={`font-medium ${shipping === 0 ? "text-green-600" : ""}`}
          >
            {shipping === 0 ? "Free" : formatPrice(shipping)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium">{formatPrice(tax)}</span>
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-gray-900">{formatPrice(total)}</span>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 h-12"
          onClick={() =>
            toast.success("Proceeding to checkout...", {
              description: "Redirecting to secure payment.",
            })
          }
        >
          <CreditCard className="w-4 h-4 mr-2" />
          Proceed to Checkout
        </Button>

        <Button variant="outline" className="w-full py-3 h-12" asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="space-y-3 text-xs text-gray-600">
          <div className="flex items-center">
            <Shield className="w-4 h-4 mr-2 text-green-600" />
            <span>Secure SSL encrypted checkout</span>
          </div>
          <div className="flex items-center">
            <Truck className="w-4 h-4 mr-2 text-blue-600" />
            <span>Free shipping on orders over $50</span>
          </div>
          <div className="flex items-center">
            <CreditCard className="w-4 h-4 mr-2 text-purple-600" />
            <span>Multiple payment options accepted</span>
          </div>
        </div>
      </div>
    </div>
  );
}
