"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function WishlistButton({
  productId,
  productTitle,
}: {
  productId: number;
  productTitle: string;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const t = useTranslations("components.whishlistbutton");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("wishlist");
      if (stored) {
        const list: number[] = JSON.parse(stored);
        setIsWishlisted(list.includes(productId));
      }
    }
  }, [productId]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session) {
      router.push("/login");
      return;
    }

    const stored = localStorage.getItem("wishlist");
    let list: number[] = stored ? JSON.parse(stored) : [];

    let next: boolean;

    if (list.includes(productId)) {
      list = list.filter((id) => id !== productId);
      next = false;
      toast(t("removed"), {
        description: productTitle,
        duration: 2000,
      });
    } else {
      list.push(productId);
      next = true;
      toast.success(t("added"), {
        description: productTitle,
        duration: 2000,
      });
    }

    localStorage.setItem("wishlist", JSON.stringify(list));
    setIsWishlisted(next);
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={handleClick}
      className={`absolute top-3 right-3 bg-white/80 backdrop-blur-sm hover:bg-white shadow-sm transition-all duration-200 ${
        isWishlisted ? "text-red-500" : "text-gray-600"
      }`}
      aria-label={isWishlisted ? t("ariaRemove") : t("ariaAdd")}
    >
      <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
    </Button>
  );
}
