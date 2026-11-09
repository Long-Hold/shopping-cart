import { create } from "zustand";

export const useCartStore = create((set) => ({
  items: {},
  addToCart: (productId, product, quantity) => set((state) => ({
    items: {
      ...state.items,
      [productId]: {
        ...product,
        quantity: (state.items[productId]?.quantity ?? 0) + quantity,
      }
    }
  })),
}));