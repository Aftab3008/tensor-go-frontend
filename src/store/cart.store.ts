import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartState, CartItem, Product } from "../types/index";
import { api } from "@/lib/api";

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addToCart: async (product: Product) => {
        try {
          const newItem: CartItem = {
            id: `${product.id}-${Date.now()}`,
            productId: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            addedAt: new Date(),
          };

          await api.post("/api/cart/add", {
            productId: product.id,
            quantity: 1,
          });

          set((state) => {
            const alreadyInCart = state.items.find(
              (item) => item.productId === product.id
            );

            if (alreadyInCart) return state;

            return {
              items: [...state.items, newItem],
              totalItems: state.totalItems + 1,
              totalPrice: state.totalPrice + product.price,
            };
          });
        } catch (error) {
          console.error("Error adding to cart:", error);
          return {
            success: false,
            message: "Failed to add item to cart",
          };
        }
      },

      removeFromCart: async (productId: string) => {
        try {
          await api.delete(`/api/cart/remove/${productId}`);

          set((state) => {
            const itemToRemove = state.items.find(
              (item) => item.productId === productId
            );

            if (!itemToRemove) return state;

            return {
              items: state.items.filter((item) => item.productId !== productId),
              totalItems: state.totalItems - 1,
              totalPrice: state.totalPrice - itemToRemove.price,
            };
          });
        } catch (error) {
          console.error("Error removing from cart:", error);
        }
      },

      clearCart: async () => {
        try {
          await api.delete("/api/cart/clear");

          set({
            items: [],
            totalItems: 0,
            totalPrice: 0,
          });
        } catch (error) {
          console.error("Error clearing cart:", error);
        }
      },

      updateCartItem: async (productId: string, quantity: number) => {
        try {
          await api.put("/api/cart/update", {
            productId,
            quantity,
          });

          set((state) => {
            const itemIndex = state.items.findIndex(
              (item) => item.productId === productId
            );

            if (itemIndex === -1) return state;

            const updatedItems = [...state.items];
            const item = updatedItems[itemIndex];
            const oldQuantity = 1; // Assuming 1 as default since we don't track quantity
            const priceDifference = item.price * (quantity - oldQuantity);

            return {
              ...state,
              totalPrice: state.totalPrice + priceDifference,
            };
          });
        } catch (error) {
          console.error("Error updating cart item:", error);
        }
      },

      loadCart: async () => {
        try {
          const response = await api.get("/api/cart/");
          const cartData = response.data;

          set({
            items: cartData.items || [],
            totalItems: cartData.totalItems || 0,
            totalPrice: cartData.totalPrice || 0,
          });
        } catch (error) {
          console.error("Error loading cart:", error);
          set({
            items: [],
            totalItems: 0,
            totalPrice: 0,
          });
        }
      },

      getCartItem: (productId: string) => {
        const state = get();
        return state.items.find((item) => item.productId === productId);
      },

      isInCart: (productId: string) => {
        const state = get();
        return state.items.some((item) => item.productId === productId);
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
