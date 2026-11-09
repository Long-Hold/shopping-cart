import { test, expect, vi, beforeEach } from "vitest";
import { useCartStore } from "./cartStore";

beforeEach(() => {
  useCartStore.setState(useCartStore.getInitialState(), true);
});

test("useCartStore.addToCart creates a new property when productId doesn't exist", () => {
  // I hate magic numbers so the quantity param will have a nice name
  const mockQuantity = 10;
  const mockProduct = {id: 1, name: "Pants", price: 10};
  // Sanity check the store is empty
  expect(items).toStrictEqual({});

  useCartStore.getState().addToCart(mockProduct.id, mockProduct, mockQuantity);
  
  expect(useCartStore.getState().items).toStrictEqual({
    [mockProduct.id]: { ...mockProduct, quantity: mockQuantity},
  });
});

test("useCartStore.addToCart creates a new property for a new item while preserving other items", () => {
  const mockQuantity = 10;
  const firstMockProduct = {id: 1, name: "Pants", price: 10};
  const secondMockProduct = {id: 2, name: "Sunglasses", price: 5};

  const { addToCart } = useCartStore.getState();

  addToCart(firstMockProduct.id, firstMockProduct, mockQuantity);

  // This test is checking if this overwrites or modifies the data at all
  addToCart(secondMockProduct.id, secondMockProduct, mockQuantity);

  const { items } = useCartStore.getState();
  expect(items[firstMockProduct.id]).toStrictEqual({...firstMockProduct, quantity: mockQuantity});
  expect(items[secondMockProduct.id]).toStrictEqual({...secondMockProduct, quantity: mockQuantity});
});

test("useCartStore.removeFromCart removes the specified item while preserving the other items", () => {
  const mockQuantity = 10;
  const productToKeep = {id: 1, name: "Pants", price: 10};
  const productToRemove = {id: 2, name: "Shirt", price: 10};

  const { addToCart, removeFromCart } = useCartStore.getState();

  addToCart(productToKeep.id, productToKeep, mockQuantity);
  addToCart(productToRemove.id, productToRemove, mockQuantity);
  
  // This test is checking if this item gets removed, and that productToKeep remains
  removeFromCart(productToRemove.id);

  const { items } = useCartStore.getState();
  expect(items).not.toHaveProperty(String(productToRemove.id));
  expect(items[productToKeep.id]).toStrictEqual({...productToKeep, quantity: mockQuantity});
})