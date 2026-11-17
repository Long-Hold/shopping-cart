import { test, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { Hero } from "./Hero";

const props = {
  title: "Fakestore's Shop",
  caption: "Style in its purest form.",
  alt: "A woman wearing a black, button up coat",
  desktop1280: "/desktop1280.webp",
  desktop1920: "/desktop1920.webp",
  desktop2560: "/desktop2560.webp",
  mobile800: "/mobile800.webp",
  mobile1200: "/mobile1200.webp",
  mobile1600: "/mobile1600.webp",
};

function renderHero(overrides = {}) {
  const { container } = render(<Hero {...props} {...overrides} />);
  return {
    sources: container.querySelectorAll("source"),
    // An img with alt="" has the "presentation" role, so getByRole("img") can't find it
    image: container.querySelector("img"),
  };
}

test("renders the title as a level 2 heading", () => {
  renderHero();

  expect(
    screen.getByRole("heading", { level: 2, name: props.title }),
  ).toBeInTheDocument();
});

test("renders the caption inside the figure", () => {
  renderHero();

  const figure = screen.getByRole("figure");
  expect(within(figure).getByText(props.caption)).toBeInTheDocument();
});

test("uses the provided alt text on the image", () => {
  renderHero();

  expect(screen.getByRole("img", { name: props.alt })).toBeInTheDocument();
});

test("defaults to empty alt text so the image is treated as decorative", () => {
  const { image } = renderHero({ alt: undefined });

  expect(image).toHaveAttribute("alt", "");
  expect(screen.queryByRole("img")).not.toBeInTheDocument();
});

test("the fallback image uses the 1920px desktop source with intrinsic dimensions and high priority", () => {
  const { image } = renderHero();

  expect(image).toHaveAttribute("src", props.desktop1920);
  expect(image).toHaveAttribute("width", "1920");
  expect(image).toHaveAttribute("height", "1080");
  expect(image).toHaveAttribute("fetchpriority", "high");
});

test("renders the mobile source first, with the media query and all three widths", () => {
  const { sources } = renderHero();
  const [mobile] = sources;

  expect(sources).toHaveLength(2);
  expect(mobile).toHaveAttribute("media", "(max-width: 37.5rem)");
  expect(mobile).toHaveAttribute(
    "srcset",
    `${props.mobile800} 800w, ${props.mobile1200} 1200w, ${props.mobile1600} 1600w`,
  );
  expect(mobile).toHaveAttribute("sizes", "100vw");
});

test("renders the desktop source second, with all three widths and no media query", () => {
  const { sources } = renderHero();
  const desktop = sources[1];

  expect(desktop).not.toHaveAttribute("media");
  expect(desktop).toHaveAttribute(
    "srcset",
    `${props.desktop1280} 1280w, ${props.desktop1920} 1920w, ${props.desktop2560} 2560w`,
  );
  expect(desktop).toHaveAttribute("sizes", "100vw");
});