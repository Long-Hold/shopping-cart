import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import { test, expect } from "vitest";
import routes from "../../routes";
import { render, screen } from "@testing-library/react";

function renderAt(path) {
  const router = createMemoryRouter(routes, {initialEntries: [path]});
  render(<RouterProvider router={router} />);
  return router;
}

test.each([
  { from: "/shop", link: /homepage/i, path: "/", heading: /home page/i },
  { from: "/", link: /shop page/i, path: "/shop", heading: /shopPage/i },
  { from: "/", link: /checkout/i, path: "/checkout", heading: /checkout/i },
])("clicking $link from $from goes to $path", async ({from, link, path, heading}) => {
  const user = userEvent.setup();
  const router = renderAt(from);

  await user.click(screen.getByRole("link", { name: link }));

  expect(router.state.location.pathname).toBe(path);
  expect(await screen.findByRole("heading", { name: heading })).toBeInTheDocument();

  // Making sure the navigation header is persistent on all pages
  expect(screen.getByRole("navigation")).toBeInTheDocument();
});