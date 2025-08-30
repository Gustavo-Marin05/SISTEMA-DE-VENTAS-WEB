import { useLocation, matchPath } from "react-router-dom";
import {
  FaHome,
  FaBoxOpen,
  FaFileInvoice,
  FaCreditCard,
  FaTags,
  FaUserCircle,
  FaBars,
} from "react-icons/fa";
import { useAuth } from "../auth/AuthContext";

export default function Navbar({ onToggleSidebar }) {
  const location = useLocation();
  const { logout, user, loading } = useAuth();

  if (loading) return null;

  const routes = [
    { path: "/", name: "HOME", icon: <FaHome className="w-6 h-6 text-white" /> },
    { path: "/admin", name: "HOME", icon: <FaHome className="w-6 h-6 text-white" /> },
    { path: "/products", name: "PRODUCTOS", icon: <FaBoxOpen className="w-6 h-6 text-white" /> },
    { path: "/category", name: "CATEGORIAS", icon: <FaTags className="w-6 h-6 text-white" /> },
    { path: "/customer", name: "CLIENTES", icon: <FaFileInvoice className="w-6 h-6 text-white" /> },
    { path: "/atm", name: "CAJEROS", icon: <FaCreditCard className="w-6 h-6 text-white" /> },
  ];

  const matchedRoute =
    routes.find((route) => matchPath(route.path, location.pathname)) || {
      name: user?.fullName || "Usuario",
      icon: <FaUserCircle className="w-6 h-6 text-white" />,
    };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-[#28395e] p-2.5 shadow-md flex items-center justify-between">
      <div className="flex items-center gap-2">
        {/* Botón hamburguesa en móviles */}
        <button
          className="text-white md:hidden mr-2"
          onClick={onToggleSidebar}
        >
          <FaBars size={20} />
        </button>
        {matchedRoute.icon}
        <span className="text-white font-bold text-lg">{matchedRoute.name}</span>
      </div>

      <button
        onClick={handleLogout}
        className="bg-[#0C1320] hover:border text-white font-semibold py-2 px-4 rounded"
      >
        Logout
      </button>
    </header>
  );
}
