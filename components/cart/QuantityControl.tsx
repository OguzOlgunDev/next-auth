"use client";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { memo } from "react";

type Props = {
  qty: number;
  onDecrement: () => void;
  onIncrement: () => void;
};

function QuantityControlBase({ qty, onDecrement, onIncrement }: Props) {
  return (
    <div className="flex items-center border border-gray-300 rounded-lg">
      <Button
        variant="ghost"
        size="icon"
        onClick={onDecrement}
        disabled={qty <= 1}
        className="h-8 w-8 rounded-none hover:bg-gray-100 disabled:opacity-50"
      >
        <Minus className="w-3 h-3" />
      </Button>
      <span className="w-12 text-center text-sm font-medium border-x border-gray-300 py-2">
        {qty}
      </span>
      <Button
        variant="ghost"
        size="icon"
        onClick={onIncrement}
        className="h-8 w-8 rounded-none hover:bg-gray-100"
      >
        <Plus className="w-3 h-3" />
      </Button>
    </div>
  );
}

export const QuantityControl = memo(QuantityControlBase);
