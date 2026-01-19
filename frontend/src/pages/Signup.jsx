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
    <div className="max-w-md mx-auto card-padded mt-6 sm:mt-10">
      <h2 className="text-2xl font-semibold text-slate-900">Create account</h2>
      <p className="text-sm text-slate-600 mt-1">
        Join StoreRating to explore and rate stores.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-6">
        <div>
          <label className="label">Full name</label>
          <input
            type="text"
            {...register("name")}
            placeholder="Your name"
            required
            className="input mt-1"
          />
        </div>

        <div>
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email")}
            placeholder="you@example.com"
            required
            className="input mt-1"
          />
        </div>

        <div>
          <label className="label">Address</label>
          <input
            type="text"
            {...register("address")}
            placeholder="City, area, street..."
            className="input mt-1"
          />
        </div>

        <div>
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password")}
            placeholder="••••••••"
            required
            className="input mt-1"
          />
          <p className="text-xs text-slate-500 mt-1">
            Must be 8–16 chars with at least 1 uppercase & 1 special symbol.
          </p>
        </div>

        <button className="btn-primary w-full">
          Create Account
        </button>
      </form>

      <p className="text-center text-sm text-slate-600 mt-5">
        Already have an account?
        <a href="/login" className="text-primary font-medium ml-1">
          Login
        </a>
      </p>
    </div>
  );
}
