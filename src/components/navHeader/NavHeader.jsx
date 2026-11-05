import { Link } from "react-router";

export function NavHeader() {
  return (
    <header>
      <nav aria-label="Main">
        <ul>
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