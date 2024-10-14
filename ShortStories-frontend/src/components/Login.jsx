import React, {useContext, useState} from "react";
import {AuthContext} from "../firebase/AuthProvider";
import {Link, useNavigate} from "react-router-dom";

const Login = () => {
  const {logIn} = useContext(AuthContext);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleLogin = e => {
    setError("");
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log(email, password);

    logIn(email, password)
      .then(result => {
        const user = result.user;
        // console.log(user);
        alert("logged In Successfully");
        form.reset();

        navigate("/", {replace: true});
      })
      .catch(error => setError(error.message));
  };

  return (
    <div className="hero  min-h-screen  rounded-md mx-auto  shadow-lg  mt-5 ">
      <div className="hero-content flex-col md:flex-row bg-stone-700 border-b-8 border-amber-200 rounded shadow">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-lg bg-transparent">
          <form onSubmit={handleLogin} id="form">
            <h1 className="text-center my-6 text-4xl font-serif italic font-semibold text-transparent bg-clip-text bg-white">
              Login
            </h1>
            <div className="card-body">
              <div className="form-control">
                <label className="label text-amber-300">
                  <span className="label-text text-white">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  className="input input-bordered"
                  name="email"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  name="password"
                />
                <p className="my-4 ">
                  <span className="text-sm font-light text-white">
                    {" "}
                    Don't Have an Account?{" "}
                  </span>
                  <Link
                    className="text-amber-100 font-semibold hover:link"
                    to="/signup"
                  >
                    Sign Up
                  </Link>{" "}
                </p>
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <div className="form-control mt-6">
                <button
                  className="btn border-0 bg-amber-200 hover:bg-amber-300 "
                  type="submit"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
