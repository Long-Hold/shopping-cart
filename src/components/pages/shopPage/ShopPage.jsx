import { Link, useRouteLoaderData } from "react-router";

import { useState, useId } from "react";
import { useCartStore } from "../../../stores/cartStore";

import { ProductCard } from "../../productCard/ProductCard";

import { Icon } from "@mdi/react";
import { mdiShoppingOutline, mdiPlus } from "@mdi/js";

export function ShopPage() {
  const storeProducts = useRouteLoaderData("root");
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <>
      <section>
        <div>
          <h2>Shop</h2>
          <p>
            Our latest line of clothes is the perfect combination of fashion and function. 
            Designed with both style and comfort in mind, these clothes are the ultimate accessory for any adventure. 
            With high-quality materials and attention to detail, our catalogues are not only stylish but also durable enough to withstand whatever your day throws your way. 
            So whether you're walking through the city or exploring the great outdoors, our daily wear will keep you looking and feeling your best.</p>
        </div>
      </section>

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