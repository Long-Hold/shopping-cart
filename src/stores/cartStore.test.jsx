import { test, expect, beforeEach } from "vitest";
import { useCartStore } from "./cartStore";

beforeEach(() => {
  useCartStore.setState(useCartStore.getInitialState(), true);
});

test("useCartStore.addToCart creates a new property when productId doesn't exist", () => {
  // I hate magic numbers so the quantity param will have a nice name
  const mockQuantity = 10;
  const mockProduct = {id: 1, name: "Pants", price: 10};
  // Sanity check the store is empty
  expect(useCartStore.getState().items).toStrictEqual({});

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

test("useCartStore.addToCart increases the quantity of a key by 1 when a duplicate is added", () => {
  const mockQuantity = 1;
  const mockProduct = {id: 1, name: "Pants", price: 10};
  const { addToCart } = useCartStore.getState();

  addToCart(mockProduct.id, mockProduct, mockQuantity);
  expect(useCartStore.getState().items[mockProduct.id].quantity).toEqual(1);

  addToCart(mockProduct.id, mockProduct, mockQuantity);
  expect(useCartStore.getState().items[mockProduct.id].quantity).toEqual(2);
});

test.each(
  [10, 23, 2]
)("useCartStore.addToCart increases key quantity by custom amount (%s)", (customQuantity) => {
  const initialQuantity = 1;
  const mockProduct = {id: 1, name: "Jorts", price: 100};

  const {addToCart} = useCartStore.getState();
  addToCart(mockProduct.id, mockProduct, initialQuantity);
  addToCart(mockProduct.id, mockProduct, customQuantity);

  const expectedQuantity = initialQuantity + customQuantity;
  const actualQuantity = useCartStore.getState().items[mockProduct.id].quantity;
  expect(actualQuantity).toEqual(expectedQuantity);
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
});

test("useCartStore.updateQuantity removes item from cart if the new quantity is 0 or less", () => {
  const mockQuantity = 1;
  const mockProduct = {id: 1, name: "Pants", price: 100};
  const { addToCart, updateQuantity } = useCartStore.getState();
  
  addToCart(mockProduct.id, mockProduct, mockQuantity);

  // Now I'm passing values that are 0 or less to see if they delete the product
  const zeroQuantity = 0;
  updateQuantity(mockProduct.id, zeroQuantity);
  // Since only one item was added, the array should just be an empty object
  expect(useCartStore.getState().items).toStrictEqual({});

  // Now I'll test it again with a negative value
  const negativeQuantity = -1;
  addToCart(mockProduct.id, mockProduct, mockQuantity);
  updateQuantity(mockProduct.id, negativeQuantity);
  expect(useCartStore.getState().items).toStrictEqual({});
});

test.each(
  [1, 13, 5583]
)("useCartStore.updateQuanity updates an item's quantity to the received value (%i)", (newQuantity) => {
  const initialQuantity = 1;
  const mockProduct = {id: 1, name: "pants", price: 10};
  const {addToCart, updateQuantity} = useCartStore.getState();

  addToCart(mockProduct.id, mockProduct, initialQuantity);
  const originalProductQuantity = useCartStore.getState().items[mockProduct.id].quantity;
  expect(originalProductQuantity).toEqual(initialQuantity);

  // Now the method should change the quantity to the passed value
  updateQuantity(mockProduct.id, newQuantity);
  const updatedProductQuantity = useCartStore.getState().items[mockProduct.id].quantity;
  expect(updatedProductQuantity).toEqual(newQuantity);
});