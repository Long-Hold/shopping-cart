import { Outlet } from "react-router";
import "./App.css";
import { NavHeader } from "./components/navHeader/NavHeader";
import { Footer } from "./components/footer/Footer";

function App() {
  return (
    <>
      <NavHeader />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
