import userEvent from "@testing-library/user-event";
import { test, expect } from "vitest";
import { screen, within, render, act} from "@testing-library/react";
import { MemoryRouter } from "react-router";

import { renderApp } from "../../tests/utils/renderApp";
import { useCartStore } from "../../stores/cartStore";
import { NavHeader } from "./NavHeader";

beforeEach(() => {
  useCartStore.setState(useCartStore.getInitialState(), true);
});

test.each([
  { from: "/shop", link: /^home$/i, path: "/", heading: /home/i },
  { from: "/", link: /^shop$/i, path: "/shop", heading: /shopPage/i },
  { from: "/", link: /^checkout$/i, path: "/checkout", heading: /checkout/i },
])("clicking $link from $from goes to $path", async ({from, link, path, heading}) => {
  const user = userEvent.setup();
  const router = await renderApp(from);

  const mainNav = screen.getByRole("navigation", { name: /main/i });

  await user.click(within(mainNav).getByRole("link", { name: link }));

  expect(router.state.location.pathname).toBe(path);
  expect(await screen.findByRole("heading", { name: heading })).toBeInTheDocument();
});

test("the 'cart items' element does not render when the user's cart has 0 or less items", () => {
  render(
    <MemoryRouter>
      <NavHeader />
    </MemoryRouter>
  );

  const checkout = screen.getByRole("link", { name: /^checkout$/i });
  expect(checkout).toHaveTextContent("");
});

test("the 'cart items' element accurately reflects the amount of items in a users cart", () => {
  const quantities = [10, 32, 472, 4, 857];
  const { addToCart } = useCartStore.getState();
  quantities.forEach((quantity, id) => {
    addToCart(id, { id, name: "Clothes", price: 10 }, quantity);
  });

  render(
    <MemoryRouter>
      <NavHeader />
    </MemoryRouter>
  );

  const checkout = screen.getByRole("link", {
    name: "Checkout, 1375 items in cart",
  });
  expect(within(checkout).getByText("1375")).toBeInTheDocument();
});

test("cart badge updates when items are added after mount", () => {
  render(
    <MemoryRouter>
      <NavHeader />
    </MemoryRouter>,
  );

  act(() => {
    useCartStore.getState().addToCart(1, { id: 1, price: 10 }, 3);
  });

  expect(
    screen.getByRole("link", { name: "Checkout, 3 items in cart" }),
  ).toBeInTheDocument();
});