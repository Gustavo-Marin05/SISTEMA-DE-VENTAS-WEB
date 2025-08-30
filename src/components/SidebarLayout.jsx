import { Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useState } from "react";

export default function SidebarLayout() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isAdmin = user?.role === "ADMIN";

  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Sidebar debajo del navbar */}
      {isAdmin && (
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      )}

      {/* Contenedor principal */}
      <div className="flex-1 flex flex-col">
        {/* Navbar fijo por encima */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        </div>

        {/* Contenido principal con scroll */}
        <main className="flex-1 pt-20 overflow-x-auto">
          <div className="p-5 mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
