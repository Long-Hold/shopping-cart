import App from "./App.jsx";
import { Checkout } from "./components/pages/checkout/Checkout.jsx";
import { HomePage } from "./components/pages/homePage/HomePage";
import { ShopPage } from "./components/pages/shopPage/ShopPage.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "homepage",
    element: <HomePage />,
  },
  {
    path: "shoppage",
    element: <ShopPage />,
  },
  {
    path: "checkout",
    element: <Checkout />,
  },
];

export default routes