// frontend/src/pages/owner/OwnerRatings.jsx
import { useEffect, useState } from "react";
import api from "../../api/api";
import { showToast } from "../../components/Toast";

export default function OwnerRatings() {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    api.get("/owner/ratings")
      .then(r => setRatings(r.data || []))
      .catch(e => { console.error(e); showToast("Failed to load ratings", "error"); });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Ratings</h1>
      {ratings.length === 0 ? (
        <div className="p-4 bg-white rounded shadow">No ratings yet</div>
      ) : (
        <div className="space-y-3">
          {ratings.map(r => (
            <div key={r.id} className="p-3 bg-white rounded shadow flex justify-between">
              <div>
                <div className="font-medium">{r.user_name}</div>
                <div className="text-sm text-muted">{r.user_email}</div>
              </div>
              <div className="text-yellow-600 font-semibold">★ {r.rating_value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
