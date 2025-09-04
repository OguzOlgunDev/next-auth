export type Product = {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  category?: string;
  qty?: number; // sadece kendi state/store için
  rating?: {
    rate: number;
    count: number;
  };
};
