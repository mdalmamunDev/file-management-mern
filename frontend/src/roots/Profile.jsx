import React, { useState } from "react";
import Header from "../comps/Header";
import BreadcrumbNavigation from "../comps/BreadcrumbNavigation";
import ActionButton from "../comps/ActionButton";

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

          {/* Avatar Section */}
          <div className="text-center">
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
          </div>

          <div className="mt-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={user.username}
              onChange={handleChange}
              disabled
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
              disabled
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

        {/* Action Button */}
        <ActionButton />
      </div>
    </div>
  );
}
