import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import { test, expect } from "vitest";
import routes from "../../../routes";
import { render, screen } from "@testing-library/react";

test("unkown paths render the ErrorPage component and offers a way back", async () => {
  const user = userEvent.setup();
  const router = createMemoryRouter(routes, { initialEntries: ["/does-not-exist"] });
  render(<RouterProvider router={router} />);


  const backLink = await screen.findByRole("link", { name: /directory/i });
  await user.click(backLink);
  expect(router.state.location.pathname).toBe("/");
})