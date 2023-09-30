import {useState, useContext} from "react";

import "./App.css";

import {Link, Outlet} from "react-router-dom";
import {AuthContext} from "./firebase/AuthProvider";

function App() {
  const {user} = useContext(AuthContext);
  console.log(user);
  return (
    <>
      <div className="drawer md:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex md:flex-col flex-col-reverse  items-center ">
          <Outlet />
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button md:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-purple-950 text-white text-xl ">
            {/* Sidebar content here */}
            {!user ? (
              <>
                {" "}
                <li className=" hover:bg-purple-400">
                  <Link to="/login">Login</Link>
                </li>
                <li className=" hover:bg-purple-400">
                  <Link to="/Signup">Sign Up</Link>
                </li>
                <li className=" hover:bg-purple-400">
                  <Link to="/stories">Stories</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <h1 className="text-md text-cyan-200">{user?.email}</h1>
                </li>
                <li className=" hover:bg-purple-400">
                  <Link to="/">Home</Link>
                </li>

                <li className=" hover:bg-purple-400">
                  <Link to="/savedstories">Saved Stories</Link>
                </li>

                <li className=" hover:bg-purple-400">
                  <Link to="/stories">Stories</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
