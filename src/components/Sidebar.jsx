import { Link } from "react-router-dom";
import {
  FaUserCircle,
  FaHome,
  FaTags,
  FaBoxOpen,
  FaFileInvoice,
  FaCreditCard,
} from "react-icons/fa";

export default function Sidebar({ isOpen, onClose }) {
  return (
    <div
      className={`fixed top-0 left-0 h-screen w-64 bg-[#0C1320] text-white flex flex-col p-4 z-50 transform transition-transform duration-300
    ${isOpen ? "translate-x-0" : "-translate-x-full"} 
    md:translate-x-0 md:static md:flex`}
    >

      {/* Perfil arriba */}
      <h2 className="text-2xl font-bold mb-6 text-center mt-3">TIENDAZO</h2>
      <div className="flex items-center gap-3 justify-center bg-[#06090f] p-3 rounded mb-6">
        <FaUserCircle size={50} className="text-blue-400" />
        <h1 className="text-xl font-semibold">ADMINISTRADOR</h1>
      </div>

      {/* Navegación con scroll si se llena */}
      <nav className="flex-1 flex flex-col gap-4 p-5 bg-[#1a253f] rounded">
        <Link to="/admin" className="text-lg" onClick={onClose}>
          <div className="bg-[#0C1320] p-3 rounded hover:border transition flex items-center gap-4">
            <FaHome size={20} />
            Home
          </div>
        </Link>
        <Link to="/category" className="text-lg" onClick={onClose}>
          <div className="bg-[#0C1320] p-3 rounded hover:border transition flex items-center gap-4">
            <FaTags size={20} />
            Categoria
          </div>
        </Link>
        <Link to="/products" className="text-lg" onClick={onClose}>
          <div className="bg-[#0C1320] p-3 rounded hover:border transition flex items-center gap-4">
            <FaBoxOpen size={20} />
            Productos
          </div>
        </Link>
        <Link to="/customer" className="text-lg" onClick={onClose}>
          <div className="bg-[#0C1320] p-3 rounded hover:border transition flex items-center gap-4">
            <FaFileInvoice size={20} />
            Clientes
          </div>
        </Link>
        <Link to="/atm" className="text-lg" onClick={onClose}>
          <div className="bg-[#0C1320] p-3 rounded hover:border transition flex items-center gap-4">
            <FaCreditCard size={20} />
            Cajeros
          </div>
        </Link>
      </nav>
    </div>
  );
}
