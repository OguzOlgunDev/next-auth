"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { formatPrice } from "@/lib/cart/money";
import { toast } from "sonner";

export default function MobileCheckoutBar({
  total,
  count,
}: {
  total: number;
  count: number;
}) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <span className="text-lg font-bold text-gray-900">
          Total: {formatPrice(total)}
        </span>
        <Badge variant="secondary">
          {count} {count === 1 ? "item" : "items"}
        </Badge>
      </div>
      <Button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
        onClick={() =>
          toast.success("Proceeding to checkout...", {
            description: "Redirecting to secure payment.",
          })
        }
      >
        <CreditCard className="w-4 h-4 mr-2" />
        Checkout
      </Button>
    </div>
  );
}
