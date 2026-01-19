// frontend/src/pages/Profile.jsx
import { useForm } from "react-hook-form";
import api from "../api/api";
import { showToast } from "../components/Toast";

export default function Profile() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.patch("/auth/update-password", data);
      showToast("Password updated successfully", "success");
      reset();
    } catch (err) {
      const msg = err?.response?.data?.message || "Password update failed";
      showToast(msg, "error");
    }
  };

  return (
    <div className="max-w-md mx-auto card-padded">
      <h2 className="text-xl font-semibold text-slate-900">Update password</h2>
      <p className="text-sm text-slate-600 mt-1">Choose a strong password for your account.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
        <div>
          <label className="label">Old password</label>
          <input {...register("oldPassword")} type="password" required className="input mt-1" />
        </div>

        <div>
          <label className="label">New password</label>
          <input {...register("newPassword")} type="password" required className="input mt-1" />
          <p className="text-xs text-slate-500 mt-1">8–16 chars, at least one uppercase and one special character</p>
        </div>

        <button className="btn-primary w-full">Save</button>
      </form>
    </div>
  );
}
