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
    <div className="flex flex-col md:flex-row min-h-screen overflow-hidden">
      {/* Sidebar */}
      {isAdmin && (
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      )}

      {/* Contenedor principal */}
      <div className="flex-1 flex flex-col items-center">
        {/* Navbar fijo */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        </div>

        {/* Contenido principal */}
        <main className="flex-1 pt-20 h-screen overflow-x-auto overflow-y-auto w-full">
          {/* Contenedor centrado */}
          <div className="flex justify-center w-full">
            <div className="w-full md:w-max px-2 md:px-4 lg:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
