import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex h-screen bg-[#1a253f] overflow-hidden">
      {/* Sidebar fijo */}
      <Sidebar />

      {/* Área principal con navbar fijo y contenido con scroll */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />

        {/* Contenido dinámico con scroll independiente */}
        <main className="flex-1 p-6 text-white overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
