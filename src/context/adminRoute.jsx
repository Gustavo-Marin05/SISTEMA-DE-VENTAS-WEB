import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

// Función para obtener el rol del usuario desde el token
function getUserRoleFromToken() {
  const token = Cookies.get("token");
  if (!token) return null;
  
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role || null;
  } catch {
    return null;
  }
}

export default function AdminRoute() {
  const role = getUserRoleFromToken();
  
  // Si no hay token, redirige al login
  if (!role) return <Navigate to="/login" replace />;
  
  // Si el rol es ADMIN, permite acceso a las rutas protegidas
  if (role === "ADMIN") return <Outlet />;
  
  // Si no es ADMIN, redirige al dashboard

 return <Navigate to="/dashboard" replace />;

}