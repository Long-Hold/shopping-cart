import userEvent from "@testing-library/user-event";
import { test, expect } from "vitest";
import { screen, within } from "@testing-library/react";
import { renderApp } from "../../tests/utils/renderApp";

test.each([
  { from: "/shop", link: /homepage/i, path: "/", heading: /home page/i },
  { from: "/", link: /shop page/i, path: "/shop", heading: /shopPage/i },
  { from: "/", link: /checkout/i, path: "/checkout", heading: /checkout/i },
])("clicking $link from $from goes to $path", async ({from, link, path, heading}) => {
  const user = userEvent.setup();
  const router = await renderApp(from);

  const mainNav = screen.getByRole("navigation", { name: /main/i });

  await user.click(within(mainNav).getByRole("link", { name: link }));

  expect(router.state.location.pathname).toBe(path);
  expect(await screen.findByRole("heading", { name: heading })).toBeInTheDocument();
});