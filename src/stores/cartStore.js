import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  items: {},
  
  /* Creates a new entry or increments an existing products quantity by the passed quantity value
  */
  addToCart: (productId, product, quantity) => set((state) => ({
    items: {
      ...state.items,
      [productId]: {
        ...product,
        quantity: (state.items[productId]?.quantity ?? 0) + quantity,
      }
    }
  })),

  /* Deletes the specified product from the items map
  */
  removeFromCart: (productId) => set((state) => ({
    items: Object.fromEntries(
      Object.entries(state.items).filter(([itemId]) => itemId !== String(productId))
    )
  })),

  /** Modifies the value of quantity to whatever newQuantity is, or deletes the product if value is <= 0
  */
  updateQuantity: (productId, newQuantity) => {
    if (newQuantity <= 0) {
      get().removeFromCart(productId);
    } 
    
    else {
      set((state) => ({
        items: {
          ...state.items,
          [productId]: {
            ...state.items[productId],
            quantity: newQuantity,
          }
        }
      }));
    }
  }
}));