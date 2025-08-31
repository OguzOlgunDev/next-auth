"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/hooks";
import { addItem, removeItem } from "@/features/cart/cartSlice";
import { toast } from "sonner";
import type { Product } from "@/types/product";
import { useTranslations } from "next-intl";

export default function AddToCartButton({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const t = useTranslations("components.addtocartbutton");

  function handleAdd() {
    const qty = product.qty ?? 1;

    dispatch(
      addItem({
        id: product.id,
        title: product.title,
        price: Number(product.price) || 0,
        image: product.image,
        qty,
      })
    );

    // Başarılı toast
    toast.success(t("toast.added", { title: product.title, qty }), {
      duration: 3000,
      action: {
        label: t("toast.undo"),
        onClick: () => {
          dispatch(removeItem(product.id));
          toast.info(t("toast.removed", { title: product.title }), {
            duration: 2000,
          });
        },
      },
    });
  }

  return (
    <Button onClick={handleAdd} className="w-full">
      {t("button")}
    </Button>
  );
}
