// frontend/src/api/api.js
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

// Attach token from localStorage (auth stored as { token, user } or token direct)
api.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem("auth") || localStorage.getItem("token");
    if (raw) {
      const parsed = JSON.parse(raw);
      const token = parsed?.token || raw;
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    // raw token may be plain string
    const rawToken = localStorage.getItem("token");
    if (rawToken) config.headers.Authorization = `Bearer ${rawToken}`;
  }
  return config;
});

export default api;
