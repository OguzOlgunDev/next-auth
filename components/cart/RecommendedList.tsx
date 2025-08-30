"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export default function RecommendedList() {
  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        <h3 className="font-semibold text-gray-900 mb-4">
          You might also like
        </h3>
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-gray-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Recommended Item {i}
                </p>
                <p className="text-xs text-gray-500">$29.99</p>
              </div>
              <Button size="sm" variant="outline" className="text-xs">
                Add
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
