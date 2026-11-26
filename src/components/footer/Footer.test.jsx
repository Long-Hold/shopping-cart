import { test, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { Footer } from "./Footer";

const links = [
  { name: "GitHub Profile", href: "https://github.com/Long-Hold" },
  { name: "Source Code", href: "https://github.com/Long-Hold/shopping-cart" },
];

test("renders the credit line inside the contentinfo landmark", () => {
  render(<Footer />);

  const footer = screen.getByRole("contentinfo");
  expect(
    within(footer).getByText(/designed and developed by matthew harview/i),
  ).toBeInTheDocument();
});

test("renders a footer navigation with a level 2 heading", () => {
  render(<Footer />);

  const nav = screen.getByRole("navigation", { name: /footer/i });
  expect(
    within(nav).getByRole("heading", { level: 2, name: "Personal Links" }),
  ).toBeInTheDocument();
});

test.each(links)("the $name link points to $href", ({ name, href }) => {
  render(<Footer />);

  const nav = screen.getByRole("navigation", { name: /footer/i });
  expect(within(nav).getByRole("link", { name })).toHaveAttribute("href", href);
});

test("only renders the expected links", () => {
  render(<Footer />);

  expect(screen.getAllByRole("link")).toHaveLength(links.length);
});

test("the link icons are decorative", () => {
  const { container } = render(<Footer />);

  const icons = container.querySelectorAll("img");
  expect(icons).toHaveLength(links.length);
  icons.forEach((icon) => expect(icon).toHaveAttribute("alt", ""));
});