import { Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function SidebarLayout() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar siempre visible a la izquierda */}
      {user?.role === "ADMIN" && <Sidebar />}

      <div className="flex-1 flex flex-col">
        {/* Navbar fijo */}
        <div className="fixed top-0 left-65 right-0 z-50 bg-[#1A2438]">
          <Navbar />
        </div>

        {/* Contenido principal con padding arriba para no solaparse */}
        <main className="flex-1 pt-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
