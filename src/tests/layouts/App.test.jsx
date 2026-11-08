import { test } from "vitest";
import { screen } from "@testing-library/react";
import { expect } from "vitest";
import { renderApp } from "../utils/renderApp";

test.each(
  ["/", "/shop", "/checkout", "/does-not-exist"]
)("header, nav, and footer are present at %s", async (path) => {
  await renderApp(path);

  // Finds the aria role of the header
  expect(await screen.findByRole("banner")).toBeInTheDocument();

  // Locates the header and footer navigation elements
  expect(screen.getByRole("navigation", { name: /main/i })).toBeInTheDocument();
  expect(screen.getByRole("navigation", { name: /footer/i })).toBeInTheDocument();

  // Content info is also an implicit aria role for footer
  expect(screen.getByRole("contentinfo")).toBeInTheDocument();
});