import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Your API base URL
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Add a request interceptor to attach the token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Get token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
