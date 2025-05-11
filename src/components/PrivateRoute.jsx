import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ requiredRole }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // Asegúrate de guardar esto al hacer login

  if (!token) return <Navigate to="/login" replace />;

  // Validar el rol requerido
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
