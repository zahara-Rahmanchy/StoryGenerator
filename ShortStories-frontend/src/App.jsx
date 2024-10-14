import {useContext} from "react";
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
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div
          className="drawer-content flex lg:flex-col flex-col-reverse  bg-amber-50 "
          // style={{
          //   background:
          //     "linear-gradient(45deg, rgba(44,169,191,1) 0%, rgba(6,34,61,1) 50%,  rgba(1,4,14,1) 100%)",
          // }}
        >
          <Outlet />
          <label
            htmlFor="my-drawer-2"
            className="btn bg-transparent drawer-button lg:hidden justify-start"
          >
            <FaBuromobelexperte className="text-3xl font-bold text-gray-700" />
          </label>
        </div>
        <div className="drawer-side z-20">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-stone-900 text-white text-xl ">
            {/* Sidebar content here */}
            <li className="text-white hover:bg-amber-100 hover:text-gray-600 focus:bg-amber-100 focus:text-gray-600 focus:outline-none hover:rounded-md ">
              <Link
                className="focus:text-gray-600 hover:text-gray-600 text-white focus:outline-none"
                to="/"
              >
                Home
              </Link>
            </li>

            <li className="text-white hover:bg-amber-100 hover:text-gray-600 focus:bg-amber-100 focus:text-gray-600 focus:outline-none hover:rounded-md ">
              <Link to="/stories">Stories</Link>
            </li>
            {!user ? (
              <>
                {" "}
                <li className="text-white hover:bg-amber-100 hover:text-gray-600 focus:bg-amber-100 focus:text-gray-600 focus:outline-none hover:rounded-md ">
                  <Link to="/login">Login</Link>
                </li>
                <li className="text-white hover:bg-amber-100 hover:text-gray-600 focus:bg-amber-100 focus:text-gray-600 focus:outline-none hover:rounded-md ">
                  <Link to="/Signup">Sign Up</Link>
                </li>
                {/* <li className=" hover:bg-purple-400">
                  <Link to="/stories">Stories</Link>
                </li> */}
              </>
            ) : (
              <>
                <li className="text-white hover:bg-amber-100 hover:text-gray-600 focus:bg-amber-100 focus:text-gray-600 focus:outline-none hover:rounded-md ">
                  <Link to="/savedstories">Saved Stories</Link>
                </li>

                <li className="text-white hover:bg-amber-100 hover:text-gray-600 focus:bg-amber-100 focus:text-gray-600 focus:outline-none hover:rounded-md ">
                  <Link to="/leaderboard">Leaderboard</Link>
                </li>

                <button
                  className="ms-2 me-0 btn btn-sm mt-4 bg-amber-500 border-none  text-white w-1/2 hover:bg-amber-400"
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
