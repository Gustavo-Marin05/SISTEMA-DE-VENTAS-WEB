import { useAuth } from "../auth/AuthContext";

export default function AdminHome() {
  const { user } = useAuth();
  return (
    <div className="p-4 text-center text-gray-700">
      <h2 className="text-2xl font-semibold mb-2">
        ¡Hola, {user?.fullName || "usuario"}!
      </h2>
      <p className="text-lg">
        Disculpa las molestias. Esta sección del panel de administración aún
        está en desarrollo.
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Estamos trabajando para ofrecerte una mejor experiencia.
      </p>
    </div>
  );
}
