import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="bg-blue-300 text-black flex justify-around items-center">
        <div className="border border-white p-2 bg-white bg-opacity-30 rounded-xl">
          <h1 className="bg-white rounded-xl p-2">Task Manager</h1>
        </div>
        <div>
          <NavLink to="/bots" className="font-semibold">
            Bots
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
