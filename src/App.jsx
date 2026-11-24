import "./App.css";

import { ViewTransition } from "react";
import { Outlet } from "react-router";
import { NavHeader } from "./components/navHeader/NavHeader";
import { Footer } from "./components/footer/Footer";

function App() {
  return (
    <>
      <div className="mainContent">
        <NavHeader />
        <ViewTransition>
          <main>
            <Outlet />
          </main>
        </ViewTransition>
      </div>
      <Footer />
    </>
  );
}

export default App;
