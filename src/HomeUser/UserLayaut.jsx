import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

// Importa aquí los componentes necesarios para el layout de usuarios

export default function UserLayout() {
  return (
    <div className="flex flex-col h-screen bg-[#1a253f]">
      <Navbar />
      <main className="flex-grow overflow-auto flex justify-center">
        <div className="w-full max-w-7xl px-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
