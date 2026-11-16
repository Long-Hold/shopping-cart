import { Link, useRouteLoaderData } from "react-router";

import { useState, useId } from "react";
import { useCartStore } from "../../../stores/cartStore";

import { Hero } from "../../hero/Hero";
import { ProductCard } from "../../productCard/ProductCard";

import { Icon } from "@mdi/react";
import { mdiShoppingOutline, mdiPlus } from "@mdi/js";

import desktop1280 from "../../../assets/images/hero1280.webp";
import desktop1920 from "../../../assets/images/hero1920.webp";
import desktop2560 from "../../../assets/images/hero2560.webp";

import styles from "./ShopPage.module.css";

export function ShopPage() {
  const storeProducts = useRouteLoaderData("root");
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <>
      <Hero
        title={"Fakestore's Shop"}
        caption={"Spring Collection, 2026"}
        alt={"A woman wearing a black, button up coat"}
        desktop1280={desktop1280}
        desktop1920={desktop1920}
        desktop2560={desktop2560}
      />

      <section>
        <ul>
          {
            storeProducts.map((product) => {
              return (
                <li key={product.id}>
                  <ProductItem product={product} onClick={addToCart} />
                </li>
              )
            })
          }
        </ul>
      </section>
      <Link to={"/"}>Return to Directory</Link>
    </>
  )
}

function ProductItem({product, onClick}) {
  const [value, setValue] = useState(1);
  const inputId = useId();

  return (
    <>
      <ProductCard {...product} />
      <div>
        <label htmlFor={inputId}>Quantity</label>
        <input 
          type="number"
          id={inputId}
          name={inputId}
          value={value}
          min="1"
          step="1"
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          type="button"
          onClick={() => onClick(product.id, product, parseInt(value))}
          aria-label="Add to cart"
        >
          <Icon path={mdiShoppingOutline} size={1} aria-hidden="true" />
          <Icon path={mdiPlus} size={1} aria-hidden="true" />
        </button>
      </div>
    </>
  )
}