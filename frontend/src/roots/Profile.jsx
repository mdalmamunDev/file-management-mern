import React, { useState } from "react";
import Header from "../comps/Header";
import BreadcrumbNavigation from "../comps/BreadcrumbNavigation";
import { ArrowLeftCircle, Trash } from "react-bootstrap-icons";
import axios from "axios";

export default function ProfilePage() {
  const [user, setUser] = useState({
    username: "JohnDoe",
    email: "johndoe@example.com",
    password: "",
    confirmPassword: "",
});

  const [avatar, setAvatar] = useState(null);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file)); // Preview the image
    }
  };

  const handleUpdate = () => {
    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Profile updated successfully!");
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

    try {
      const response = await axios.delete('/api/users/drop-account', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      // Handle successful account deletion
      alert(response.data.message || 'Account successfully deleted');
    } catch (error) {
      // Handle error (e.g., user not found, server issues)
      const errorMessage = error.response?.data?.message || 'Something went wrong';
      alert(errorMessage);
    }
  };
  

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      alert("Account deleted successfully!");
    }
  };

  return (
    <div>
      {/* Header */}
      <Header />

      <div className="container-fluid p-4">
        {/* Breadcrumb Navigation */}
        <BreadcrumbNavigation item="Profile" />

        {/* Profile Section */}
        <div className="card p-4 shadow-sm">
          <h3 className="mb-3 text-center">Profile Information</h3>

          <div className="row">
            {/* Left Section */}
            <div className="col-md-4 border-end p-3 text-center">
              <label htmlFor="avatarUpload">
                <img
                  src={avatar || "https://cdn-icons-png.flaticon.com/512/6858/6858504.png"} // Default avatar
                  alt="Avatar"
                  className="rounded-circle"
                  style={{ width: "120px", height: "120px", cursor: "pointer" }}
                />
              </label>
              <input
                type="file"
                id="avatarUpload"
                className="d-none"
                accept="image/*"
                onChange={handleAvatarChange}
              />
              <h5 className="mt-3">{user.username}</h5>
              <p>{user.email}</p>
              <div className="d-flex flex-column mt-4">
                <button className="btn btn-outline-secondary bg-secondary mb-2" onClick={handleLogout}>
                  <ArrowLeftCircle size={20}/> Logout
                </button>
                <button className="btn btn-danger bg-danger" onClick={handleDeleteAccount}>
                  <Trash size={20} /> Delete Account
                </button>
              </div>
            </div>

            {/* Right Section */}
            <div className="col-md-8 p-3">
              <div className="mt-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-3">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
              </div>

              <div className="mt-3">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  value={user.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <button className="btn btn-primary w-100 mt-4" onClick={handleUpdate}>
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
