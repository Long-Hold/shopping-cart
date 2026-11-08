import userEvent from "@testing-library/user-event";
import { test, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderApp } from "../../../tests/utils/renderApp";

test("unkown paths render the ErrorPage component and offers a way back", async () => {
  const user = userEvent.setup();
  const router = await renderApp("/does-not-exist");


  await user.click(screen.getByRole("link", { name: /directory/i }));
  expect(router.state.location.pathname).toBe("/");
})