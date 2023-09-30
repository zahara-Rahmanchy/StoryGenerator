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

    // console.log(name, email, password, url);

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
          .post("http://localhost:3000/users", newUser)
          .then(response => {
            if (response) {
              alert("Registered Successfully!");
            }
          })
          .catch(error => {
            setError(error.message);
          });
        navigate("/", {replace: true});

        form.reset();
      })
      .catch(error => setError(error.message));
  };
  return (
    <div className="hero  min-h-screen bg-base-100 rounded-md mx-auto">
      <div className="hero-content flex-col md:flex-row">
        <div className="card flex-shrink-0 w-full max-w-md shadow-2xl ">
          <div className="card-body">
            <form onSubmit={handleSignUp} id="form">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
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
                  <span className="label-text">Email</span>
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
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  name="password"
                  required
                />
                <p className="my-4 ">
                  <span className="text-sm font-light">
                    {" "}
                    Already Have an Account?{" "}
                  </span>
                  <Link
                    className="text-blue-600 font-semibold hover:link"
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
                  className="btn border-0 bg-gradient-to-r  from-teal-300 via-base-600 to-teal-500 "
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
