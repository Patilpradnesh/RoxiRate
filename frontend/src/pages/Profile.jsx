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
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-card">
      <h2 className="text-xl font-semibold mb-4">Update Password</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="text-sm block mb-1">Old password</label>
          <input {...register("oldPassword")} type="password" required className="w-full border rounded-lg px-3 py-2" />
        </div>

        <div>
          <label className="text-sm block mb-1">New password</label>
          <input {...register("newPassword")} type="password" required className="w-full border rounded-lg px-3 py-2" />
          <p className="text-xs text-muted mt-1">8–16 chars, at least one uppercase and one special character</p>
        </div>

        <button className="w-full bg-primary text-white py-2 rounded-lg">Save</button>
      </form>
    </div>
  );
}
