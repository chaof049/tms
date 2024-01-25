import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import BotController from "./Components/Bot/BotController";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            {/* <Footer></Footer> */}
          </div>
        }
      >
        <Route index element={<div>Home Page</div>}></Route>
        <Route
          path="bots"
          element={
            <div>
              <Outlet></Outlet>
            </div>
          }
        >
          <Route index element={<BotController></BotController>}></Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
