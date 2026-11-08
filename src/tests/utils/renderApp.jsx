import { createMemoryRouter, RouterProvider } from "react-router";
import { render, screen } from "@testing-library/react";
import routes from "../../routes";

export async function renderApp(path = "/") {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  render(<RouterProvider router={router} />);

  // Wait for the root loader to resolve and the real layout to replace HydrateFallback
  await screen.findByRole("banner");
  return router;
}