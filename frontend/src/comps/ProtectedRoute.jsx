import { Navigate } from "react-router-dom";

export default ({ element }) => {
  const token = localStorage.getItem("token"); // Check if user is authenticated

  return token ? element : <Navigate to="/" replace />; // Redirect to login if no token
};

