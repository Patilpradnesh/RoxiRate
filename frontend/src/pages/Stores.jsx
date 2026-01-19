// frontend/src/pages/Stores.jsx
import { useEffect, useMemo, useState } from "react";
import api from "../api/api";
import StoreCard from "../components/StoreCard";
import { showToast } from "../components/Toast";

export default function Stores() {
  const [stores, setStores] = useState([]);
  const [q, setQ] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [loading, setLoading] = useState(true);

  const fetchStores = async () => {
    try {
      setLoading(true);
      const res = await api.get("/stores");
      setStores(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("stores fetch error:", err?.response || err);
      showToast("Failed to load stores", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleRate = async (storeId, rating) => {
    try {
      await api.post(`/rating/${storeId}`, { rating });
      showToast("Rating saved", "success");
      await fetchStores();
    } catch (err) {
      console.error("rating error:", err?.response || err);
      showToast("Failed to save rating", "error");
    }
  };

  const filtered = useMemo(() => {
    const byQ = stores.filter((s) =>
      `${s.name} ${s.address} ${s.email}`.toLowerCase().includes(q.toLowerCase())
    );
    if (sortBy === "rating") {
      return byQ.sort((a, b) => (b.average_rating || 0) - (a.average_rating || 0));
    }
    if (sortBy === "name") {
      return byQ.sort((a, b) => a.name.localeCompare(b.name));
    }
    return byQ;
  }, [stores, q, sortBy]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6">
        <div>
          <h1 className="page-title">Stores</h1>
          <p className="page-subtitle mt-1">Search and rate stores you’ve visited.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, address, email..."
            className="input sm:w-80"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select sm:w-44"
          >
            <option value="name">Sort: Name</option>
            <option value="rating">Sort: Rating</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="card-padded text-center">
          <div className="text-sm text-slate-600">Loading stores…</div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="card-padded text-center">
          <div className="text-sm text-slate-600">No stores found</div>
          <div className="text-xs text-slate-500 mt-1">Try a different search term.</div>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {filtered.map((s) => (
            <StoreCard
              key={s.id}
              store={{
                ...s,
                user_rating: s.user_rating || 0   // ⭐ FIX APPLIED HERE
              }}
              onRate={handleRate}
            />
          ))}
        </div>
      )}
    </div>
  );
}
