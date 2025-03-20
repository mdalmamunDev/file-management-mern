import React from "react";
import icon from "./../assets/img/app-icon.png";
import { Link } from "react-router-dom";

export default function PasswordForgot() {
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
            <h2 className="mb-4">Forgot your password?</h2>
            <p>Please enter your email to reset your password</p>
            <form className=" text-start mt-5">
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
              </div>
              <div className="text-center mt-5">
                <button type="submit" className="btn btn-primary btn-block" style={{width: 200}}>
                  Get Verification Code
                </button>

                <p className="mt-2">Back to <Link to="/">Login</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
