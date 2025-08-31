"use client";

import Link from "next/link";
import { useMemo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { increment, decrement, removeItem } from "@/features/cart/cartSlice";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import CartEmpty from "@/components/cart/CartEmpty";
import { CartItemCard } from "@/components/cart/CartItemCard";
import ShippingNotice from "@/components/cart/ShippingNotice";
import OrderSummary from "@/components/cart/OrderSummary";
import RecommendedList from "@/components/cart/RecommendedList";
import MobileCheckoutBar from "@/components/cart/MobileCheckoutBar";
import { calcTotals } from "@/lib/cart/totals";

export default function CartPage() {
  const items = useAppSelector((s) => s.cart.items);
  const dispatch = useAppDispatch();

  const { subtotal, shipping, tax, finalTotal } = useMemo(
    () => calcTotals(items),
    [items]
  );

  const handleRemoveItem = useCallback(
    (id: number, title: string) => {
      dispatch(removeItem(id));
      toast.success("Item removed from cart", {
        description: `${title} has been removed from your cart.`,
      });
    },
    [dispatch]
  );

  const handleIncrement = useCallback(
    (id: number) => {
      dispatch(increment(id));
    },
    [dispatch]
  );

  const handleDecrement = useCallback(
    (id: number) => {
      dispatch(decrement(id));
    },
    [dispatch]
  );

  if (items.length === 0) return <CartEmpty />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <Badge variant="secondary" className="text-sm">
              {items.length} {items.length === 1 ? "item" : "items"}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                onRemove={handleRemoveItem}
                onInc={handleIncrement}
                onDec={handleDecrement}
              />
            ))}
            <ShippingNotice total={subtotal} />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <OrderSummary
                itemCount={items.length}
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                total={finalTotal}
              />
            </Card>
            <RecommendedList />
          </div>
        </div>

        <MobileCheckoutBar total={finalTotal} count={items.length} />
      </div>
    </div>
  );
}
