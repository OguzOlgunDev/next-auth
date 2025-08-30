"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Shield, Truck } from "lucide-react";

export default function CartEmpty() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-16 h-16 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            Looks like you haven't added any items to your cart yet. Start
            shopping to fill it up!
          </p>
          <div className="space-y-4">
            <Link href="/products">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Start Shopping
              </Button>
            </Link>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <span className="flex items-center">
                <Shield className="w-4 h-4 mr-1" />
                Secure checkout
              </span>
              <span className="flex items-center">
                <Truck className="w-4 h-4 mr-1" />
                Free shipping over $50
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
