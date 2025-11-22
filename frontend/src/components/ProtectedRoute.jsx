import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, roles = [] }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (roles.length > 0 && !roles.includes(user.role)) {
    return <div className="p-6 text-center font-semibold text-red-600">
      Access Denied
    </div>;
  }

  return children;
}
