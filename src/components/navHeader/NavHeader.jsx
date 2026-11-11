import { Link } from "react-router";
import { useCartStore } from "../../stores/cartStore";

import { Icon } from "@mdi/react";
import { mdiShoppingOutline, mdiRhombusSplit } from '@mdi/js';

import styles from "./NavHeader.module.css";

export function NavHeader() {
  const totalItems = useCartStore((state) => 
    Object.values(state.items).reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <header className={styles.navHeader}>
      <Link className={styles.textLogo} to={"/"}>
        <Icon path={mdiRhombusSplit} size={1} aria-hidden="true" />
        <b>Fakestore</b>
      </Link>
      <nav className={styles.nav} aria-label="Main">
        <ul className={styles.navList}>
          <li>
            <Link className={styles.navLink} to={"/"}>Home</Link>
          </li>
          <li>
            <Link className={styles.navLink} to={"/shop"}>Shop</Link>
          </li>
          <li className={styles.checkoutLink}>
            <Link to={"/checkout"} aria-label="Checkout">
              <Icon path={mdiShoppingOutline} size={1} aria-hidden="true" />
              {totalItems > 0 && <span className={styles.cartItems}>{totalItems}</span> }
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}