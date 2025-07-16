import { api } from "@/lib/api";
import { Order } from "@/types/orders";

export const fetchAllOrders = async (): Promise<Order[]> => {
  try {
    const response = await api.get("/api/orders/all-orders");
    return response.data.orders as Order[];
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};
