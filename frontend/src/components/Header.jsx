import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useMemo, useState } from "react";

export default function Header() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const links = useMemo(() => {
    if (!user) {
      return [
        { to: "/", label: "Home" },
        { to: "/login", label: "Login" },
      ];
    }

    if (user.role === "admin") {
      return [
        { to: "/admin/dashboard", label: "Dashboard" },
        { to: "/admin/stores", label: "Stores" },
        { to: "/admin/users", label: "Users" },
        { to: "/profile", label: "Profile" },
      ];
    }

    if (user.role === "owner") {
      return [
        { to: "/owner/dashboard", label: "Dashboard" },
        { to: "/owner/ratings", label: "Ratings" },
        { to: "/profile", label: "Profile" },
      ];
    }

    return [
      { to: "/stores", label: "Stores" },
      { to: "/profile", label: "Profile" },
    ];
  }, [user]);

  const navClass = ({ isActive }) =>
    `px-2 py-1 rounded-md transition ${
      isActive
        ? "text-primary bg-primary/10"
        : "text-slate-700 hover:text-primary hover:bg-slate-100"
    }`;

  return (
    <header className="sticky top-0 z-40">
      <div className="surface border-x-0 border-t-0">
        <div className="container-max flex items-center justify-between gap-4 py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold shadow">
              SR
            </div>
            <div className="leading-tight">
              <div className="text-base sm:text-lg font-semibold text-slate-900">StoreRating</div>
              <div className="text-xs text-slate-500">Discover & rate local stores</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1 text-sm">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className={navClass}>
                {l.label}
              </NavLink>
            ))}
            {!user ? (
              <NavLink to="/signup" className="btn-primary ml-2">
                Signup
              </NavLink>
            ) : (
              <div className="ml-2 flex items-center gap-2">
                <span className="badge-primary">{user.role}</span>
                <button onClick={logout} className="btn-danger">
                  Logout
                </button>
              </div>
            )}
          </nav>

          {/* Mobile */}
          <div className="md:hidden">
            <button
              className="btn-secondary px-3 py-2"
              onClick={() => setOpen((v) => !v)}
              aria-label="Open menu"
              aria-expanded={open}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 6h14M3 10h14M3 14h14" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* mobile panel */}
      {open && (
        <div className="md:hidden">
          <div className="container-max mt-3">
            <div className="card p-3">
              <div className="flex flex-col gap-1">
                {(!user ? [{ to: "/", label: "Home" }, ...links] : links).map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    className={navClass}
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </NavLink>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between">
                {!user ? (
                  <NavLink to="/signup" className="btn-primary w-full" onClick={() => setOpen(false)}>
                    Signup
                  </NavLink>
                ) : (
                  <>
                    <span className="badge-primary">{user.role}</span>
                    <button
                      onClick={() => {
                        logout();
                        setOpen(false);
                      }}
                      className="btn-danger"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
