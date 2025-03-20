import React from "react";
import icon from "./../assets/img/app-icon.png";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card shadow-lg" style={{ width: "400px" }}>
          <div className="card-body text-center">
            {/* Logo */}
            <img
              src={icon}
              alt="Logo"
              className="mb-4"
              style={{ width: "100px", height: "auto" }}
            />
            <h2 className="mb-4">Login</h2>
            <form className=" text-start">
              <div className="form-group mb-3">
                <label htmlFor="username">User name</label>
                <input
                  type="username"
                  className="form-control"
                  id="username"
                  placeholder="User name"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="exampleInputEmail1">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  required
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="exampleInputPassword12">Password Confirm</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword12"
                  placeholder="Password Confirm"
                  required
                />
              </div>

              <div className="form-group form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  I have read & agreed to <a href="#">Terms</a> & <a href="#">Conditions</a>
                </label>
              </div>
              <div className="text-center mt-5">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  style={{ width: 200 }}
                >
                  Log In
                </button>
                <p className="mt-2">
                  Already have account? <Link to="/">Login</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
