import { Link, useRouteLoaderData } from "react-router";

import { useState, useId } from "react";
import { useCartStore } from "../../../stores/cartStore";

import { Hero } from "../../hero/Hero";
import { ProductCard } from "../../productCard/ProductCard";

import { Icon } from "@mdi/react";
import { mdiPlus, mdiMinus } from "@mdi/js";

import desktop1280 from "../../../assets/images/hero1280.webp";
import desktop1920 from "../../../assets/images/hero1920.webp";
import desktop2560 from "../../../assets/images/hero2560.webp";

import mobile800 from "../../../assets/images/mobile/mobile800.webp";
import mobile1200 from "../../../assets/images/mobile/mobile1200.webp";
import mobile1600 from "../../../assets/images/mobile/mobile1600.webp";

import styles from "./ShopPage.module.css";

export function ShopPage() {
  const storeProducts = useRouteLoaderData("root");
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <>
      <Hero
        title={"Fakestore's Shop"}
        caption={"Style in its purest form."}
        alt={"A woman wearing a black, button up coat"}
        desktop1280={desktop1280}
        desktop1920={desktop1920}
        desktop2560={desktop2560}
        mobile800={mobile800}
        mobile1200={mobile1200}
        mobile1600={mobile1600}
      />

      <section className={styles.productSection}>
        <ul className={styles.productList}>
          {
            storeProducts.map((product) => {
              return (
                <li key={product.id} className={styles.productListItem}>
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
      <div className={styles.addProductControls}>
        <div className={styles.inputGroup}>
          <label
            className={styles.hiddenInput}
            htmlFor={inputId}>Quantity</label>
            <button
              className={styles.stepButton}
              type="button"  
              aria-label="Decrease quantity"
              onClick={() => setValue((v) => Math.max(1, Number(v) - 1))}
            >
              <Icon path={mdiMinus} size={0.8} aria-hidden="true" />
            </button>
            <input
              className={styles.qtyInput}
              type="number"
              id={inputId}
              name={inputId}
              value={value}
              min="1"
              step="1"
              onChange={(e) => setValue(e.target.value)}
            />
            <button
              className={styles.stepButton}
              type="button"
              aria-label="Increase quantity"
              onClick={() => setValue((v) => Number(v) + 1)}
            > 
              <Icon path={mdiPlus} size={0.8} aria-hidden="true" />
            </button>
        </div>
        <button
          className={styles.addItemBtn}
          type="button"
          onClick={() => onClick(product.id, product, parseInt(value))}
        >
          add to cart
        </button>
      </div>
    </>
  )
}