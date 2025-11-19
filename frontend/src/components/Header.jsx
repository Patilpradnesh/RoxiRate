// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between py-4">
        <Link to="/" className="font-bold text-xl text-primary">StoreRating</Link>
        <nav className="flex items-center gap-4">
          <Link to="/" className="text-sm hover:underline">Home</Link>

          {!user && (
            <>
              <Link to="/login" className="text-sm hover:underline">Login</Link>
              <Link to="/signup" className="text-sm hover:underline">Signup</Link>
            </>
          )}

          {user && user.role === "user" && (
            <>
              <Link to="/stores" className="text-sm hover:underline">Stores</Link>
              <Link to="/profile" className="text-sm hover:underline">Profile</Link>
            </>
          )}

          {user && user.role === "owner" && (
            <>
              <Link to="/owner/dashboard" className="text-sm hover:underline">Owner</Link>
              <Link to="/owner/ratings" className="text-sm hover:underline">Ratings</Link>
              <Link to="/profile" className="text-sm hover:underline">Profile</Link>
            </>
          )}

          {user && user.role === "admin" && (
            <>
              <Link to="/admin/dashboard" className="text-sm hover:underline">Admin</Link>
              <Link to="/admin/stores" className="text-sm hover:underline">Stores</Link>
              <Link to="/admin/users" className="text-sm hover:underline">Users</Link>
              <Link to="/profile" className="text-sm hover:underline">Profile</Link>
            </>
          )}

          {user && (
            <button onClick={logout} className="text-sm bg-red-500 text-white px-3 py-1 rounded">Logout</button>
          )}
        </nav>
      </div>
    </header>
  );
}
