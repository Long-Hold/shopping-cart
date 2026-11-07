import App from "./App.jsx";
import { Checkout } from "./components/pages/checkout/Checkout.jsx";
import { ErrorPage } from "./components/pages/errorPage/ErrorPage.jsx";
import { HomePage } from "./components/pages/homePage/HomePage";
import { ShopPage } from "./components/pages/shopPage/ShopPage.jsx";

const routes = [
  {
    id: "root",
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: async () => {
      const result = await fetch("https://fakestoreapi.com/products");
      if (!result.ok) throw new Response("Failed to load products", { status: result.status });
      return result.json();
    },
    HydrateFallback: () => <p>Loading...</p>,
    children: [
      { index: true, element: <HomePage />},
      { path: "shop", element: <ShopPage />},
      { path: "checkout", element: <Checkout />},
      { path: "*", element: <ErrorPage />},
    ],
  },
];

export default routes