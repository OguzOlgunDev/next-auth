export type Product = {
  id: number; // ✅ sadece number
  title: string;
  description: string;
  image: string;
  price: number;
  category?: string;
  qty?: number;
};
