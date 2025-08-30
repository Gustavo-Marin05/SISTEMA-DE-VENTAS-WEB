import { useLocation, matchPath } from "react-router-dom";
import {
  FaHome,
  FaBoxOpen,
  FaFileInvoice,
  FaCreditCard,
  FaTags,
  FaUserCircle,
  FaBars
} from "react-icons/fa";
import { useAuth } from "../auth/AuthContext";

export default function Navbar({ onToggleSidebar }) {
  const location = useLocation();
  const { logout, user, loading } = useAuth();

  if (loading) return null;

  const routes = [
    { path: "/", name: "HOME", icon: <FaHome className="w-10 h-10 text-white ml-15" /> },
    { path: "/admin", name: "HOME", icon: <FaHome className="w-10 h-10 text-white ml-15" /> },
    { path: "/products", name: "PRODUCTOS", icon: <FaBoxOpen className="w-10 h-10 text-white ml-15" /> },
    { path: "/category", name: "CATEGORIAS", icon: <FaTags className="w-10 h-10 text-white ml-15" /> },
    { path: "/customer", name: "CLIENTES", icon: <FaFileInvoice className="w-10 h-10 text-white ml-15" /> },
    { path: "/atm", name: "CAJEROS", icon: <FaCreditCard className="w-10 h-10 text-white ml-15" /> },
  ];

  const matchedRoute =
    routes.find(route => matchPath(route.path, location.pathname)) || {
      name: user?.fullName || "Usuario",
      icon: <FaUserCircle className="w-10 h-10 text-white ml-15" />
    };

  return (
    <header className="bg-[#28395e] p-2.5 shadow-md flex items-center justify-between">
      <div className="flex items-center gap-2">
        {/* Botón hamburguesa solo en móvil */}
        <button className="md:hidden text-white" onClick={onToggleSidebar}>
          <FaBars size={28} />
        </button>
        {matchedRoute.icon}
        <span className="text-white font-bold text-lg">{matchedRoute.name}</span>
      </div>

      <button
        onClick={logout}
        className="bg-[#0C1320] hover:border text-white font-semibold py-2 px-4 rounded mr-5"
      >
        Logout
      </button>
    </header>
  );
}
