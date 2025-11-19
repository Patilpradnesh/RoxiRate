// src/pages/Signup.jsx
import React from "react";
import { useForm } from "react-hook-form";
import api from "../api/api";
import { showToast } from "../components/Toast";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post("/auth/signup", data);
      showToast("Signup success. Please login.", "success");
      navigate("/login");
    } catch (err) {
      showToast(err?.response?.data?.message || "Signup failed", "error");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Signup</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input {...register("name")} placeholder="Full name (20-60 chars)" className="w-full border px-3 py-2 rounded" />
        <input {...register("email")} placeholder="Email" className="w-full border px-3 py-2 rounded" />
        <input {...register("address")} placeholder="Address" className="w-full border px-3 py-2 rounded" />
        <input {...register("password")} type="password" placeholder="Password" className="w-full border px-3 py-2 rounded" />
        <button className="w-full bg-primary text-white py-2 rounded">Signup</button>
      </form>
    </div>
  );
}

