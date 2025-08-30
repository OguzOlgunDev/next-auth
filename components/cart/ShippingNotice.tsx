"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Truck } from "lucide-react";

export default function ShippingNotice({ total }: { total: number }) {
  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <Truck className="w-5 h-5 text-blue-600" />
          <div>
            {total >= 50 ? (
              <p className="text-sm font-medium text-blue-800">
                🎉 You qualify for free shipping!
              </p>
            ) : (
              <p className="text-sm font-medium text-blue-800">
                Add ${(50 - total).toFixed(2)} more for free shipping
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
