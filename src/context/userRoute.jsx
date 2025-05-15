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

export default function UserRoute() {
  const role = getUserRoleFromToken();
  
  // Si no hay token, redirige al login
  if (!role) return <Navigate to="/login" replace />;
  
  // Si el rol es diferente de ADMIN, permite acceso a las rutas de usuario
  if (role !== "ADMIN") return <Outlet />;
  
  // Si es ADMIN, redirige al home de admin
  return <Navigate to="/home" replace />;
}