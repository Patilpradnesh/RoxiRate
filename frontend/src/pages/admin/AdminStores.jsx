// frontend/src/pages/admin/AdminStores.jsx
import { useEffect, useState } from "react";
import api from "../../api/api";
import { showToast } from "../../components/Toast";

export default function AdminStores() {
  const [stores, setStores] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const load = async () => {
    try {
      const res = await api.get("/admin/stores");
      setStores(res.data || []);
    } catch (err) {
      console.error(err);
      showToast("Failed to load stores", "error");
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Stores</h1>
        <button onClick={()=>setShowForm(true)} className="bg-primary text-white px-3 py-1 rounded-lg">Add store</button>
      </div>

      <div className="grid gap-3">
        {stores.map(s => (
          <div key={s.id} className="p-3 bg-white rounded-lg shadow flex justify-between">
            <div>
              <div className="font-medium">{s.name}</div>
              <div className="text-sm text-muted">{s.email} • {s.address}</div>
            </div>
            <div className="text-yellow-700 font-semibold">★ {s.rating ?? 0}</div>
          </div>
        ))}
      </div>

      {showForm && <AddStoreForm onClose={() => { setShowForm(false); load(); }} />}
    </div>
  );
}

function AddStoreForm({ onClose }) {
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [saving, setSaving] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await api.post("/admin/store", form);
      onClose();
      showToast("Added store", "success");
    } catch (err) {
      console.error(err);
      showToast("Add store failed", "error");
    } finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <form onSubmit={submit} className="bg-white p-6 rounded-lg w-96 space-y-3">
        <h3 className="text-lg font-semibold">Add Store</h3>
        <input required placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="w-full border px-2 py-1 rounded"/>
        <input required placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="w-full border px-2 py-1 rounded"/>
        <input placeholder="Address" value={form.address} onChange={e=>setForm({...form, address:e.target.value})} className="w-full border px-2 py-1 rounded"/>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} type="button" className="px-3 py-1">Cancel</button>
          <button disabled={saving} className="bg-primary text-white px-3 py-1 rounded-lg">{saving ? "Saving..." : "Save"}</button>
        </div>
      </form>
    </div>
  );
}
