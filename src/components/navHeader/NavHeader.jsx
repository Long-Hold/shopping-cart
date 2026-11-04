import { Link } from "react-router";

export function NavHeader() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to={"homepage"}>Homepage</Link>
          </li>
          <li>
            <Link to={"shoppage"}>Shop Page</Link>
          </li>
          <li>
            <Link to={"checkout"}>Checkout</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}