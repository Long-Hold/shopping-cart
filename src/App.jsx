import { Outlet } from "react-router";
import "./App.css";
import { NavHeader } from "./components/navHeader/NavHeader";

function App() {
  return (
    <>
      <NavHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
