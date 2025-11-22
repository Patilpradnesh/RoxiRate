// frontend/src/pages/owner/OwnerDashboard.jsx
import { useEffect, useState } from "react";
import api from "../../api/api";
import { showToast } from "../../components/Toast";

export default function OwnerDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/owner/dashboard")
      .then(r => setData(r.data))
      .catch(e => { console.error(e); showToast("Failed to load", "error"); });
  }, []);

  if (!data) return <div className="p-6 bg-white rounded shadow">Loading...</div>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-card">
      <h1 className="text-2xl font-bold mb-4">Owner Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg border">
          <div className="text-sm text-muted">Store</div>
          <div className="font-semibold text-lg">{data.name}</div>
          <div className="text-sm text-muted mt-1">{data.address}</div>
        </div>

        <div className="p-4 rounded-lg border">
          <div className="text-sm text-muted">Rating</div>
          <div className="font-semibold text-lg">★ {data.rating ?? 0}</div>
        </div>

        <div className="p-4 rounded-lg border">
          <div className="text-sm text-muted">Details</div>
          <div className="text-sm mt-1">ID: {data.id}</div>
        </div>
      </div>
    </div>
  );
}
