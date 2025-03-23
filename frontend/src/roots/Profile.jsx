import React, { useState, useEffect } from "react";
import Header from "../comps/Header";
import BreadcrumbNavigation from "../comps/BreadcrumbNavigation";
import { ArrowLeftCircle, Trash } from "react-bootstrap-icons";
import api from "../api/api";

export default function ProfilePage() {
  const [user, setUser] = useState({
    user_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("auth/profile");
        if (response.data) {
          setUser({
            user_name: response.data.user_name,
            email: response.data.email,
            password: "",
            confirmPassword: "",
          });
          if (response.data.avatar) {
            setAvatar(response.data.avatar);
          }
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        alert("Failed to load profile data.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file)); // Preview the image
    }
  };

  const handleUpdate = async () => {
    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("userName", user.user_name);
      formData.append("email", user.email);
      if (user.password && user.confirmPassword) {
        formData.append("password", user.password);
        formData.append("newPassword", user.password);
        formData.append("confirmNewPassword", user.confirmPassword);
      }
  
      const response = await api.put("auth/profile", formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.data.message) {
        alert(response.data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      alert(errorMessage);
    }
  };
  

  const handleLogout = async () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        const response = await api.delete("auth");
        if (response.data.success) {
          alert("Account deleted successfully!");
          handleLogout();
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Something went wrong";
        alert(errorMessage);
      }
    }
  };

  if (loading) {
    return <div>Loading profile data...</div>; // Show loading message while fetching
  }

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
                  src={
                    avatar ||
                    "https://cdn-icons-png.flaticon.com/512/6858/6858504.png"
                  } // Default avatar
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
              <h5 className="mt-3">{user.user_name}</h5>
              <p>{user.email}</p>
              <div className="d-flex flex-column mt-4">
                <button
                  className="btn btn-outline-secondary bg-secondary mb-2"
                  onClick={handleLogout}
                >
                  <ArrowLeftCircle size={20} /> Logout
                </button>
                <button
                  className="btn btn-danger bg-danger"
                  onClick={handleDeleteAccount}
                >
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
                  name="user_name"
                  value={user.user_name}
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

              <button
                className="btn btn-primary w-100 mt-4"
                onClick={handleUpdate}
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}