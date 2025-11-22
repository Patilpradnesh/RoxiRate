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
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-card p-8 mt-10">
      <h2 className="text-2xl font-bold mb-2 text-gray-900">Welcome Back</h2>
      <p className="text-sm text-gray-500 mb-6">
        Login to continue to StoreRating
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            {...register("password")}
            placeholder="••••••••"
            required
            className="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
          />
        </div>

        <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-700 transition">
          Login
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-4">
        Don't have an account?
        <a href="/signup" className="text-primary font-medium ml-1">
          Signup
        </a>
      </p>
    </div>
  );
}
