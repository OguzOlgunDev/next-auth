"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2, Tag } from "lucide-react";
import { QuantityControl } from "./QuantityControl";
import { formatPrice } from "@/lib/cart/money";
import { memo } from "react";
import type { CartItem } from "@/types/cart";

type Props = {
  item: CartItem;
  onRemove: (id: number, title: string) => void;
  onInc: (id: number) => void;
  onDec: (id: number) => void;
};

function CartItemCardBase({ item, onRemove, onInc, onDec }: Props) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="relative w-24 h-24 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
            {item.image && (
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain p-2"
                sizes="96px"
              />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-4">
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">SKU: {item.id}</p>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-900">
                    {formatPrice(item.price)}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    <Tag className="w-3 h-3 mr-1" />
                    Best Price
                  </Badge>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemove(item.id, item.title)}
                className="text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700">
                  Quantity:
                </span>
                <QuantityControl
                  qty={item.qty}
                  onDecrement={() => onDec(item.id)}
                  onIncrement={() => onInc(item.id)}
                />
              </div>

              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">
                  {formatPrice(item.price * item.qty)}
                </p>
                {item.qty > 1 && (
                  <p className="text-xs text-gray-500">
                    {formatPrice(item.price)} each
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export const CartItemCard = memo(CartItemCardBase);
