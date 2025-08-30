"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { toast } from "sonner";

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

  // İlk açılışta localStorage'dan oku
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

    // login yoksa login sayfasına yönlendir
    if (!session) {
      router.push("/login");
      return;
    }

    const stored = localStorage.getItem("wishlist");
    let list: number[] = stored ? JSON.parse(stored) : [];

    let next: boolean;

    if (list.includes(productId)) {
      // Favorilerden çıkar
      list = list.filter((id) => id !== productId);
      next = false;
      toast("Favorilerden çıkarıldı ❌", {
        description: productTitle,
        duration: 2000,
      });
    } else {
      // Favorilere ekle
      list.push(productId);
      next = true;
      toast.success("Favorilere eklendi ❤️", {
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
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
    </Button>
  );
}
