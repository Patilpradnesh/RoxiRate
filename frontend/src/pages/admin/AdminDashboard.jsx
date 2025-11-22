// frontend/src/pages/admin/AdminDashboard.jsx
import { useEffect, useState } from "react";
import api from "../../api/api";
import { showToast } from "../../components/Toast";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  useEffect(() => {
    api.get("/admin/dashboard")
      .then(r => setData(r.data))
      .catch(e => { console.error(e); showToast("Failed to load dashboard","error"); });
  }, []);

  if(!data) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="p-4 bg-white rounded shadow">
        <div className="text-sm text-gray-500">Total users</div>
        <div className="text-2xl font-bold">{data.total_users}</div>
      </div>
      <div className="p-4 bg-white rounded shadow">
        <div className="text-sm text-gray-500">Total stores</div>
        <div className="text-2xl font-bold">{data.total_stores}</div>
      </div>
      <div className="p-4 bg-white rounded shadow">
        <div className="text-sm text-gray-500">Total ratings</div>
        <div className="text-2xl font-bold">{data.total_ratings}</div>
      </div>
    </div>
  );
}
