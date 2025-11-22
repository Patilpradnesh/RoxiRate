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
      showToast("Signup successful, please login", "success");
      navigate("/login");
    } catch (err) {
      const msg = err?.response?.data?.message || "Signup failed";
      showToast(msg, "error");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-card p-8 mt-10">
      <h2 className="text-2xl font-bold mb-2 text-gray-900">Create Account</h2>
      <p className="text-sm text-gray-500 mb-6">
        Join StoreRating to explore and rate stores.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            {...register("name")}
            placeholder="Your name"
            required
            className="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register("email")}
            placeholder="you@example.com"
            required
            className="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            {...register("address")}
            placeholder="City, area, street..."
            className="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            placeholder="••••••••"
            required
            className="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
          />
          <p className="text-xs text-gray-500 mt-1">
            Must be 8–16 chars with at least 1 uppercase & 1 special symbol.
          </p>
        </div>

        <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-700 transition">
          Create Account
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account?
        <a href="/login" className="text-primary font-medium ml-1">
          Login
        </a>
      </p>
    </div>
  );
}
