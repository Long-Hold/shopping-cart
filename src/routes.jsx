import App from "./App.jsx";
import { Checkout } from "./components/pages/checkout/Checkout.jsx";
import { ErrorPage } from "./components/pages/errorPage/ErrorPage.jsx";
import { HomePage } from "./components/pages/homePage/HomePage";
import { ShopPage } from "./components/pages/shopPage/ShopPage.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
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