// 1. ProtectedRoute con debugging
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ requiredRole }) {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    console.log("Retornando loading...");
    return <p className="bg-yellow-300 p-4">Cargando...</p>;
  }

  if (!isAuthenticated) {
    console.log("No autenticado, redirigiendo a login");
    return <Navigate to="/login" />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    console.log("Rol no coincide, redirigiendo a /");
    return <Navigate to="/" />;
  }

  console.log("Todo OK, renderizando Outlet");
  return <Outlet />;
}
