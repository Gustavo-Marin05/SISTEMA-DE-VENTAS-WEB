import { Link } from "react-router-dom";
import { FaUserCircle, FaHome, FaTags, FaBoxOpen, FaFileInvoice, FaCreditCard } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="w-65 h-screen bg-[#0C1320] text-white flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-8 text-center mt-3">MY STORE</h2>

      <div className="flex items-center gap-3 justify-center bg-[#06090f] p-3 rounded mb-8">
        <FaUserCircle size={50} className="text-blue-400" />
        <h1 className="text-xl font-semibold">USER ADMIN</h1>
      </div>

      <nav className="flex flex-col gap-4 p-5 bg-[#1a253f] rounded">
        <Link to="/home" className="text-lg">
          <div className="bg-[#0C1320] p-3 rounded hover:border transition flex items-center gap-4">
            <FaHome size={20} /> 
            Home
          </div>
        </Link>
        <Link to="/category" className="text-lg">
          <div className="bg-[#0C1320] p-3 rounded hover:border transition flex items-center gap-4">
            <FaTags size={20} />
            Category
          </div>
        </Link>
        <Link to="/products" className="text-lg">
          <div className="bg-[#0C1320] p-3 rounded hover:border transition flex items-center gap-4">
            <FaBoxOpen size={20} />
            Products
          </div>
        </Link>
        <Link to="/customer" className="text-lg">
          <div className="bg-[#0C1320] p-3 rounded hover:border transition flex items-center gap-4">
            <FaFileInvoice size={20} />
            Customer
          </div>
        </Link>
        <Link to="/atm" className="text-lg">
          <div className="bg-[#0C1320] p-3 rounded hover:border transition flex items-center gap-4">
            <FaCreditCard size={20} />
            ATM
          </div>
        </Link>
      </nav>
    </div>
  );
}
