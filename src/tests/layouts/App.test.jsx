import { createMemoryRouter, RouterProvider } from "react-router";
import { test } from "vitest";
import routes from "../../routes";
import { render, screen } from "@testing-library/react";
import { expect } from "vitest";

test.each(
  ["/", "/shop", "/checkout", "/does-not-exist"]
)("header, nav, and footer are present at %s", async (path) => {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  render(<RouterProvider router={router} />);

  // Finds the aria role of the header
  expect(await screen.findByRole("banner")).toBeInTheDocument();

  // Locates the header and footer navigation elements
  expect(screen.getByRole("navigation", { name: /main/i })).toBeInTheDocument();
  expect(screen.getByRole("navigation", { name: /footer/i })).toBeInTheDocument();

  // Content info is also an implicit aria role for footer
  expect(screen.getByRole("contentinfo")).toBeInTheDocument();
});