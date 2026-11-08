import { createMemoryRouter, RouterProvider } from "react-router";
import { render, screen } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import routes from "../../routes";

test.each([
  {
    scenario: "a non-OK response",
    arrange: () => vi.mocked(fetch).mockResolvedValueOnce({ ok: false, status: 500 }),
  },
  {
    scenario: "a network failure",
    arrange: () => vi.mocked(fetch).mockRejectedValueOnce(new Error("Network down")),
  },
])("renders the ErrorPage when the product loader gets $scenario", async ({ arrange }) => {
  arrange();
  const router = createMemoryRouter(routes, { initialEntries: ["/"] });
  render(<RouterProvider router={router} />);

  expect(await screen.findByRole("heading", { name: /oops/i })).toBeInTheDocument();
  expect(screen.queryByRole("banner")).not.toBeInTheDocument();
});