import { fetchAllOrders } from "@/utils/orders";
import { useQuery } from "@tanstack/react-query";

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: fetchAllOrders,
    refetchOnWindowFocus: true,
  });
};
