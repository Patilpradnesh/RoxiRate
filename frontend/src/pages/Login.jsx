// src/pages/Login.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import { showToast } from "../components/Toast";

export default function Login() {
  const { login } = useAuth();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      showToast("Login successful", "success");
    } catch (err) {
      showToast(err?.response?.data?.message || "Login failed", "error");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input {...register("email")} placeholder="Email" className="w-full border px-3 py-2 rounded" />
        <input {...register("password")} type="password" placeholder="Password" className="w-full border px-3 py-2 rounded" />
        <button className="w-full bg-primary text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}
