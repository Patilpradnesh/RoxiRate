// src/api/api.js
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" }
});

api.interceptors.request.use(
  (config) => {
    try {
      const raw = localStorage.getItem("auth");
      if (raw) {
        const auth = JSON.parse(raw);
        if (auth?.token) config.headers.Authorization = `Bearer ${auth.token}`;
      }
    } catch (e) { /* ignore */ }
    return config;
  },
  (err) => Promise.reject(err)
);

export default api;
