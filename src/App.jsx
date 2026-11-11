import "./App.css";

import { Outlet } from "react-router";
import { NavHeader } from "./components/navHeader/NavHeader";
import { Footer } from "./components/footer/Footer";

function App() {
  return (
    <>
      <div className="mainContent">
        <NavHeader />
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
}

export default App;
