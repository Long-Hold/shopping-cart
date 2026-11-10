import { Link } from "react-router";
import styles from "./NavHeader.module.css";

export function NavHeader() {
  return (
    <header className={styles.navHeader}>
      <Link to={"/"}>Fakestore</Link>
      <nav className={styles.nav} aria-label="Main">
        <ul className={styles.navList}>
          <li>
            <Link to={"/"}>Homepage</Link>
          </li>
          <li>
            <Link to={"/shop"}>Shop Page</Link>
          </li>
          <li>
            <Link to={"/checkout"}>Checkout</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}