import {useState, useContext} from "react";
import {FaBuromobelexperte} from "react-icons/fa";
import "./App.css";

import {Link, Outlet, useNavigate} from "react-router-dom";
import {AuthContext} from "./firebase/AuthProvider";

function App() {
  const {user, logOut} = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/");
      })
      .catch(error => console.log(error));
  };
  console.log(user);
  return (
    <>
      <div className="drawer md:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div
          className="drawer-content flex md:flex-col flex-col-reverse  items-end "
          style={{
            background:
              "linear-gradient(45deg, rgba(44,169,191,1) 0%, rgba(6,34,61,1) 50%,  rgba(1,4,14,1) 100%)",
          }}
        >
          <Outlet />
          <label
            htmlFor="my-drawer-2"
            className="btn bg-cyan-300 drawer-button md:hidden"
          >
            <FaBuromobelexperte className="text-xl" />
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-slate-900 text-white text-xl ">
            {/* Sidebar content here */}
            <li className=" hover:bg-gradient-to-r  from-teal-300 via-base-600 to-teal-500 hover:rounded-md ">
              <Link to="/">Home</Link>
            </li>
            <li className=" hover:bg-gradient-to-r  from-teal-300 via-base-600 to-teal-500 hover:rounded-md">
              <Link to="/stories">Stories</Link>
            </li>
            {!user ? (
              <>
                {" "}
                {/* <li className=" hover:bg-purple-400">
                  <Link to="/login">Login</Link>
                </li> */}
                <li className=" hover:bg-gradient-to-r  from-teal-300 via-base-600 to-teal-500 hover:rounded-md">
                  <Link to="/Signup">Sign Up</Link>
                </li>
                {/* <li className=" hover:bg-purple-400">
                  <Link to="/stories">Stories</Link>
                </li> */}
              </>
            ) : (
              <>
                <li className=" hover:bg-gradient-to-r  from-teal-300 via-base-600 to-teal-500 hover:rounded-md">
                  <Link to="/savedstories">Saved Stories</Link>
                </li>

                <li className=" hover:bg-gradient-to-r  from-teal-300 via-base-600 to-teal-500 hover:rounded-md">
                  <Link to="/leaderboard">Leaderboard</Link>
                </li>

                <button
                  className="ms-2 me-0 btn btn-sm mt-4"
                  onClick={handleLogOut}
                >
                  Logout
                </button>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
