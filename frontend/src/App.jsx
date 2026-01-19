import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Toast from "./components/Toast";
import Stores from "./pages/Stores";
import Profile from "./pages/Profile.jsx";
import OwnerDashboard from "./pages/owner/OwnerDashboard.jsx";
import OwnerRatings from "./pages/owner/OwnerRatings.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminStores from "./pages/admin/AdminStores.jsx";
import AdminUserDetail from "./pages/admin/AdminUserDetail.jsx";

export default function App() {
  return (
    <div className="app-bg">
      <Header />

      <main className="container-max py-8 sm:py-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/stores"
            element={
              <ProtectedRoute roles={["user", "admin", "owner"]}>
                <Stores />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute roles={["user", "admin", "owner"]}>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/owner/dashboard"
            element={
              <ProtectedRoute roles={["owner"]}>
                <OwnerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/owner/ratings"
            element={
              <ProtectedRoute roles={["owner"]}>
                <OwnerRatings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/stores"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminStores />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users/:id"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminUserDetail />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="container-max pb-10">
        <div className="text-xs text-slate-500">
          © {new Date().getFullYear()} StoreRating • Built with MERN
        </div>
      </footer>

      <Toast />
    </div>
  );
}
