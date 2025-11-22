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
      <div className="flex items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold">Stores</h1>

        <div className="flex gap-2 w-full md:w-auto">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search stores, address, email..."
            className="flex-1 md:w-72 border rounded-lg px-3 py-2 bg-white"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-lg px-3 py-2 bg-white"
          >
            <option value="name">Sort: Name</option>
            <option value="rating">Sort: Rating</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="p-6 bg-white rounded-lg shadow text-center">Loading stores...</div>
      ) : filtered.length === 0 ? (
        <div className="p-6 bg-white rounded-lg shadow text-center">No stores found</div>
      ) : (
        <div className="grid gap-4">
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
