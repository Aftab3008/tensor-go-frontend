import { api } from "@/lib/api";
import { Product } from "@/types";

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get("/api/products");
    const data: Product[] = response.data.products;
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
