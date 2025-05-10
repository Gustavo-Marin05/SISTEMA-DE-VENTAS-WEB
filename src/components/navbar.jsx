import { useLocation, matchPath, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBoxOpen,
  FaFileInvoice,
  FaCreditCard,
  FaTags,
} from "react-icons/fa";

import { signOut } from "firebase/auth";
import { auth } from "../firebase/credentials";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Lista de rutas con sus datos
  const routes = [
    {
      path: "/",
      name: "HOME",
      icon: <FaHome className="w-10 h-10 text-white ml-15" />,
    },
    {
      path: "/home",
      name: "HOME",
      icon: <FaHome className="w-10 h-10 text-white ml-15" />,
    },
    {
      path: "/products",
      name: "PRODUCTS",
      icon: <FaBoxOpen className="w-10 h-10 text-white ml-15" />,
    },
    {
      path: "/category",
      name: "CATEGORY",
      icon: <FaTags className="w-10 h-10 text-white ml-15" />,
    },
    {
      path: "/orders",
      name: "ORDERS",
      icon: <FaFileInvoice className="w-10 h-10 text-white ml-15" />,
    },
    {
      path: "/atm",
      name: "ATM",
      icon: <FaCreditCard className="w-10 h-10 text-white ml-15" />,
    },
    {
      path: "/products/create",
      name: "CREATE PRODUCT",
      icon: <FaBoxOpen className="w-10 h-10 text-white ml-15" />,
    },
    {
      path: "/products/edit/:id",
      name: "EDIT PRODUCT",
      icon: <FaBoxOpen className="w-10 h-10 text-white ml-15" />,
    },
    {
      path: "/category/create",
      name: "CREATE CATEGORY",
      icon: <FaTags className="w-10 h-10 text-white ml-15" />,
    },
    {
      path: "/category/edit/:id",
      name: "EDIT CATEGORY",
      icon: <FaTags className="w-10 h-10 text-white ml-15" />,
    },
    {
      path: "/atm/edit/:id",
      name: "EDIT ATM",
      icon: <FaCreditCard className="w-10 h-10 text-white ml-15" />,
    },
    {
      path: "/atm/create",
      name: "CREATE ATM",
      icon: <FaTags className="w-10 h-10 text-white ml-15" />,
    },
  ];

  // Buscar la ruta que coincida con la actual
  const matchedRoute = routes.find((route) =>
    matchPath(route.path, location.pathname)
  ) || {
    name: "Unknown",
    icon: <FaHome className="w-10 h-10 text-white ml-15" />,
  };



   // Función para cerrar sesión
   const handleLogout = async () => {
    try {
      await signOut(auth); // Cierra sesión de Firebase
      navigate("/login"); // Redirige al login
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("Hubo un error al cerrar sesión.");
    }
  };

  return (
    <header className="bg-[#28395e] p-2.5 shadow-md flex items-center justify-between">
      <div className="flex items-center gap-2">
        {matchedRoute.icon}
        <span className="text-white font-bold text-lg">
          {matchedRoute.name}
        </span>
      </div>

      <button
        onClick={handleLogout}
        className="bg-[#0C1320] hover:border text-white font-semibold py-2 px-4 rounded mr-5"
      >
        Logout
      </button>
    </header>
  );
}
