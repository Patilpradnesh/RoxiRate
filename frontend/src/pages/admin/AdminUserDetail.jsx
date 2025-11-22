import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import { showToast } from "../../components/Toast";

export default function AdminUserDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/admin/users/${id}`);
      setData(res.data);
    } catch (err) {
      console.error(err);
      showToast("Failed to load user details", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>User not found</div>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-3">User Detail</h1>

      <div className="mb-4">
        <p><strong>Name:</strong> {data.name}</p>
        <p><strong>Email:</strong> {data.email}</p>
        <p><strong>Role:</strong> {data.role}</p>
        <p><strong>Address:</strong> {data.address}</p>
      </div>

      {data.role === "owner" && (
        <>
          <h2 className="text-xl font-semibold mb-2">Owner Store</h2>
          {data.store ? (
            <div className="p-3 border rounded mb-4">
              <p><strong>Store Name:</strong> {data.store.name}</p>
              <p><strong>Rating:</strong> {data.store.rating}</p>
              <p><strong>Address:</strong> {data.store.address}</p>
            </div>
          ) : (
            <p>No store found</p>
          )}

          <h2 className="text-xl font-semibold mb-2">Store Ratings</h2>
          {data.ratings && data.ratings.length > 0 ? (
            <div className="space-y-2">
              {data.ratings.map((r) => (
                <div key={r.id} className="p-3 bg-gray-100 rounded flex justify-between">
                  <div>
                    <p className="font-medium">{r.user_name}</p>
                    <p className="text-gray-600 text-sm">{r.user_email}</p>
                  </div>
                  <div className="text-yellow-700 font-bold">
                    ★ {r.rating_value}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No ratings yet</p>
          )}
        </>
      )}

      {data.role === "user" && (
        <>
          <h2 className="text-xl font-semibold mt-4 mb-2">User Ratings</h2>
          {data.ratings && data.ratings.length > 0 ? (
            <div className="space-y-2">
              {data.ratings.map((r) => (
                <div key={r.id} className="p-3 bg-gray-100 rounded flex justify-between">
                  <div>
                    <p className="font-medium">{r.store_name}</p>
                    <p className="text-gray-600 text-sm">{r.store_address}</p>
                  </div>
                  <div className="text-yellow-700 font-bold">★ {r.rating_value}</div>
                </div>
              ))}
            </div>
          ) : (
            <p>This user has not rated any stores yet</p>
          )}
        </>
      )}
    </div>
  );
}
