import userEvent from "@testing-library/user-event";
import { test, expect, beforeEach, vi } from "vitest";
import { screen, within } from "@testing-library/react";

import { renderApp } from "../../../tests/utils/renderApp";
import { useCartStore } from "../../../stores/cartStore";

const products = [
  { id: 1, title: "Black Coat", price: 100, image: "/coat.jpg" },
  { id: 2, title: "Wool Scarf", price: 25, image: "/scarf.jpg" },
  { id: 3, title: "Leather Boots", price: 80, image: "/boots.jpg" },
];

beforeEach(() => {
  useCartStore.setState(useCartStore.getInitialState(), true);
});

// Overrides the default empty-array fetch stub from setup.js for the root loader
function renderShop() {
  vi.mocked(fetch).mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve(products),
  });
  return renderApp("/shop");
}

// The nav and footer also contain <li> elements, so scope to a product by its heading
function getProductItem(title) {
  return within(
    screen.getByRole("heading", { level: 3, name: title }).closest("li"),
  );
}

test("renders the hero heading", async () => {
  await renderShop();

  expect(
    screen.getByRole("heading", { level: 2, name: /fakestore's shop/i }),
  ).toBeInTheDocument();
});

test("renders a card for every product returned by the loader", async () => {
  await renderShop();

  products.forEach(({ title, price }) => {
    const item = getProductItem(title);
    expect(item.getByText(`$${price}`)).toBeInTheDocument();
    expect(item.getByRole("button", { name: /add to cart/i })).toBeInTheDocument();
  });
});

test("every quantity input starts at 1", async () => {
  await renderShop();

  products.forEach(({ title }) => {
    const input = getProductItem(title).getByRole("spinbutton", { name: /quantity/i });
    expect(input).toHaveValue(1);
  });
});

test("the plus and minus buttons adjust the quantity", async () => {
  const user = userEvent.setup();
  await renderShop();

  const item = getProductItem(products[0].title);
  const input = item.getByRole("spinbutton", { name: /quantity/i });

  await user.click(item.getByRole("button", { name: /increase quantity/i }));
  await user.click(item.getByRole("button", { name: /increase quantity/i }));
  expect(input).toHaveValue(3);

  await user.click(item.getByRole("button", { name: /decrease quantity/i }));
  expect(input).toHaveValue(2);
});

test("the minus button never takes the quantity below 1", async () => {
  const user = userEvent.setup();
  await renderShop();

  const item = getProductItem(products[0].title);
  await user.click(item.getByRole("button", { name: /decrease quantity/i }));

  expect(item.getByRole("spinbutton", { name: /quantity/i })).toHaveValue(1);
});

test("each product keeps its own quantity state", async () => {
  const user = userEvent.setup();
  await renderShop();

  await user.click(
    getProductItem(products[0].title).getByRole("button", { name: /increase quantity/i }),
  );

  expect(
    getProductItem(products[0].title).getByRole("spinbutton", { name: /quantity/i }),
  ).toHaveValue(2);
  expect(
    getProductItem(products[1].title).getByRole("spinbutton", { name: /quantity/i }),
  ).toHaveValue(1);
});

test("add to cart adds 1 of the product by default", async () => {
  const user = userEvent.setup();
  await renderShop();

  await user.click(
    getProductItem(products[0].title).getByRole("button", { name: /add to cart/i }),
  );

  expect(useCartStore.getState().items).toEqual({
    [products[0].id]: { ...products[0], quantity: 1 },
  });
});

test("add to cart uses the quantity typed into the input", async () => {
  const user = userEvent.setup();
  await renderShop();

  const item = getProductItem(products[1].title);
  const input = item.getByRole("spinbutton", { name: /quantity/i });

  await user.clear(input);
  await user.type(input, "5");
  await user.click(item.getByRole("button", { name: /add to cart/i }));

  expect(useCartStore.getState().items[products[1].id].quantity).toBe(5);
});

test("adding the same product twice accumulates its quantity", async () => {
  const user = userEvent.setup();
  await renderShop();

  const item = getProductItem(products[0].title);
  await user.click(item.getByRole("button", { name: /add to cart/i }));
  await user.click(item.getByRole("button", { name: /add to cart/i }));

  expect(useCartStore.getState().items[products[0].id].quantity).toBe(2);
});

test("adding different products only touches the products added", async () => {
  const user = userEvent.setup();
  await renderShop();

  await user.click(
    getProductItem(products[0].title).getByRole("button", { name: /add to cart/i }),
  );
  await user.click(
    getProductItem(products[2].title).getByRole("button", { name: /add to cart/i }),
  );

  const { items } = useCartStore.getState();
  expect(Object.keys(items)).toEqual([String(products[0].id), String(products[2].id)]);
});

test("the header cart badge updates after adding items", async () => {
  const user = userEvent.setup();
  await renderShop();

  const item = getProductItem(products[0].title);
  await user.click(item.getByRole("button", { name: /increase quantity/i }));
  await user.click(item.getByRole("button", { name: /increase quantity/i }));
  await user.click(item.getByRole("button", { name: /add to cart/i }));

  expect(
    screen.getByRole("link", { name: "Checkout, 3 items in cart" }),
  ).toBeInTheDocument();
});

test("the return link goes back to the directory", async () => {
  const user = userEvent.setup();
  const router = await renderShop();

  await user.click(screen.getByRole("link", { name: /return to directory/i }));

  expect(router.state.location.pathname).toBe("/");
});

test.each([
  { scenario: "an empty input", typed: "" },
  { scenario: "zero", typed: "0" },
  { scenario: "a negative number", typed: "-3" },
])("add to cart falls back to 1 when the quantity is $scenario", async ({ typed }) => {
  const user = userEvent.setup();
  await renderShop();

  const item = getProductItem(products[0].title);
  const input = item.getByRole("spinbutton", { name: /quantity/i });

  await user.clear(input);
  if (typed) await user.type(input, typed);
  await user.click(item.getByRole("button", { name: /add to cart/i }));

  expect(useCartStore.getState().items[products[0].id].quantity).toBe(1);
});

test("leaving the quantity input empty resets it to 1 on blur", async () => {
  const user = userEvent.setup();
  await renderShop();

  const input = getProductItem(products[0].title).getByRole("spinbutton", {
    name: /quantity/i,
  });

  await user.clear(input);
  await user.tab();

  expect(input).toHaveValue(1);
});