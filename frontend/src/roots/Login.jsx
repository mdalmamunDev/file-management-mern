import React, { useState } from "react";
import icon from "./../assets/img/app-icon.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      navigate('/profile');
    } catch (error) {
      console.error(error);
    }
  };


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
            <form className="text-start" onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="exampleInputEmail1">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group form-check mb-3 text-end">
                <Link to="password_forgot" className="text-black">Forgot Password?</Link>
              </div>
              <div className="text-center mt-5">
                <button type="submit" className="btn btn-primary btn-block" style={{width: 200}}>
                  Log In
                </button>
                <p className="mt-2">Don't have any account? <Link to="signup">Sing Up</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
