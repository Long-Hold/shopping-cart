import { Link } from "react-router";
import "./App.css";

function App() {
  return (
    <>
      <h2>Currently viewing: Directory</h2>
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
    </>
  );
}

export default App;
