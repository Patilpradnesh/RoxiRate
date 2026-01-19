import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, roles = [] }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (roles.length > 0 && !roles.includes(user.role)) {
    return (
      <div className="max-w-xl mx-auto card-padded text-center">
        <div className="text-sm font-semibold text-red-700">Access denied</div>
        <div className="mt-2 text-sm text-slate-600">
          Your account doesn’t have permission to view this page.
        </div>
      </div>
    );
  }

  return children;
}
