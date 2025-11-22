import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

export default function Header() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white shadow-soft sticky top-0 z-40">
      <div className="container-max flex items-center justify-between gap-4 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold shadow">
            SR
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900">StoreRating</div>
            <div className="text-xs text-muted">Discover & rate local stores</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-4 text-sm">
          <Link to="/" className="text-gray-700 hover:text-primary">Home</Link>

          {!user ? (
            <>
              <Link to="/login" className="text-gray-700 hover:text-primary">Login</Link>
              <Link to="/signup" className="ml-2 inline-block px-3 py-1 rounded-lg bg-primary text-white hover:bg-primary-700">Signup</Link>
            </>
          ) : (
            <>
              {user.role === "user" && (
                <>
                  <Link to="/stores" className="text-gray-700 hover:text-primary">Stores</Link>
                  <Link to="/profile" className="text-gray-700 hover:text-primary">Profile</Link>
                </>
              )}

              {user.role === "owner" && (
                <>
                  <Link to="/owner/dashboard" className="text-gray-700 hover:text-primary">Dashboard</Link>
                  <Link to="/owner/ratings" className="text-gray-700 hover:text-primary">Ratings</Link>
                  <Link to="/profile" className="text-gray-700 hover:text-primary">Profile</Link>
                </>
              )}

              {user.role === "admin" && (
                <>
                  <Link to="/admin/dashboard" className="text-gray-700 hover:text-primary">Dashboard</Link>
                  <Link to="/admin/stores" className="text-gray-700 hover:text-primary">Stores</Link>
                  <Link to="/admin/users" className="text-gray-700 hover:text-primary">Users</Link>
                  <Link to="/profile" className="text-gray-700 hover:text-primary">Profile</Link>
                </>
              )}

              <button onClick={logout} className="ml-3 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600">
                Logout
              </button>
            </>
          )}
        </nav>

        {/* Mobile */}
        <div className="md:hidden">
          <button className="p-2 rounded-md bg-white border" onClick={() => setOpen(!open)} aria-label="Open menu">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M3 6h14M3 10h14M3 14h14"/></svg>
          </button>
        </div>
      </div>

      {/* mobile panel */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <div className="flex flex-col gap-2 p-4">
            <Link to="/" onClick={()=>setOpen(false)} className="py-1">Home</Link>
            {!user ? (
              <>
                <Link to="/login" onClick={()=>setOpen(false)}>Login</Link>
                <Link to="/signup" onClick={()=>setOpen(false)}>Signup</Link>
              </>
            ) : (
              <>
                <Link to="/stores" onClick={()=>setOpen(false)}>Stores</Link>
                <Link to="/profile" onClick={()=>setOpen(false)}>Profile</Link>
                <button onClick={() => { logout(); setOpen(false); }} className="text-left text-red-600">Logout</button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
