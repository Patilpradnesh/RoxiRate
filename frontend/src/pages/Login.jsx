import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import { showToast } from "../components/Toast";

export default function Login() {
  const { login } = useAuth();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await login(data);
      showToast("Logged in successfully", "success");
    } catch (err) {
      const msg = err?.response?.data?.message || "Login failed";
      showToast(msg, "error");
    }
  };

  return (
    <div className="max-w-md mx-auto card-padded mt-6 sm:mt-10">
      <h2 className="text-2xl font-semibold text-slate-900">Welcome back</h2>
      <p className="text-sm text-slate-600 mt-1">
        Login to continue to StoreRating
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-6">
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
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password")}
            placeholder="••••••••"
            required
            className="input mt-1"
          />
        </div>

        <button className="btn-primary w-full">
          Login
        </button>
      </form>

      <p className="text-center text-sm text-slate-600 mt-5">
        Don't have an account?
        <a href="/signup" className="text-primary font-medium ml-1">
          Signup
        </a>
      </p>
    </div>
  );
}
