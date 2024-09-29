import React, {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../firebase/AuthProvider";
import axios from "axios";

const Signup = () => {
  const {createUser} = useContext(AuthContext);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const handleSignUp = event => {
    event.preventDefault();

    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    console.log(name, email, password);

    createUser(email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        const newUser = {
          name: user.name,
          email: user.email,
          uid: user.uid,
        };

        axios
          .post("https://y-seven-ecru.vercel.app/users", newUser)
          .then(response => {
            if (response) {
              alert("Registered Successfully!");
            }
          })
          .catch(error => {
            setError(error.message);
            console.log("err: ", error);
          });
        navigate("/", {replace: true});

        form.reset();
      })
      .catch(error => setError(error.message));
  };
  return (
    <div className="hero  min-h-screen bg-tranparent rounded-md mx-auto">
      <div className="hero-content flex-col md:flex-row">
        <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-slate-800 bg-opacity-90 ">
          <div className="card-body">
            <h1 className="text-center my-6 text-4xl font-serif italic font-semibold text-transparent bg-clip-text text-white">
              Sign Up
            </h1>
            <form onSubmit={handleSignUp} id="form">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered"
                  name="name"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="Email"
                  className="input input-bordered"
                  name="email"
                  required
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
                  required
                />
                <p className="my-4 ">
                  <span className="text-sm font-light text-white">
                    {" "}
                    Already Have an Account?{" "}
                  </span>
                  <Link
                    className="text-white font-semibold hover:link"
                    to="/login"
                  >
                    Login
                  </Link>{" "}
                </p>
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn border-0 bg-amber-200 hover:bg-amber-300 "
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
