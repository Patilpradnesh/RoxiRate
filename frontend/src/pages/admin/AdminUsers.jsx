// frontend/src/pages/admin/AdminUsers.jsx
import { useEffect, useState } from "react";
import api from "../../api/api";
import { showToast } from "../../components/Toast";
import { Link } from "react-router-dom";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data || []);
    } catch (err) {
      console.error(err);
      showToast("Failed to load users", "error");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Users</h1>
        <button onClick={() => setShowForm(true)} className="bg-primary text-white px-3 py-1 rounded-lg">Add user</button>
      </div>

      <div className="grid gap-2">
        {users.map(u => (
          <Link key={u.id} to={`/admin/users/${u.id}`} className="p-3 bg-white rounded-lg shadow flex justify-between hover:shadow-md">
            <div>
              <div className="font-medium">{u.name}</div>
              <div className="text-sm text-muted">{u.email} • {u.role}</div>
            </div>
            <div className="text-sm text-muted">View</div>
          </Link>
        ))}
      </div>

      {showForm && <AddUserForm onClose={() => { setShowForm(false); fetchUsers(); }} />}
    </div>
  );
}

function AddUserForm({ onClose }) {
  const [form, setForm] = useState({ name: "", email: "", address: "", password: "", role: "owner" });
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await api.post("/admin/user", form);
      onClose();
      showToast("User created", "success");
    } catch (err) {
      console.error(err);
      showToast(err?.response?.data?.message || "Create user failed", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <form onSubmit={submit} className="bg-white p-6 rounded-lg w-96 space-y-3">
        <h3 className="text-lg font-semibold">Add user</h3>
        <input required placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="w-full border px-2 py-1 rounded"/>
        <input required placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="w-full border px-2 py-1 rounded"/>
        <input placeholder="Address" value={form.address} onChange={e=>setForm({...form, address:e.target.value})} className="w-full border px-2 py-1 rounded"/>
        <input required placeholder="Password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} className="w-full border px-2 py-1 rounded"/>
        <select value={form.role} onChange={e=>setForm({...form, role:e.target.value})} className="w-full border px-2 py-1 rounded">
          <option value="user">user</option>
          <option value="owner">owner</option>
          <option value="admin">admin</option>
        </select>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-3 py-1">Cancel</button>
          <button disabled={saving} className="bg-primary text-white px-3 py-1 rounded-lg">{saving ? "Saving..." : "Save"}</button>
        </div>
      </form>
    </div>
  );
}
