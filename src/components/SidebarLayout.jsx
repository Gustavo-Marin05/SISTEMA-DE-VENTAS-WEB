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
    <div className="flex min-h-screen">
      {isAdmin && (
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      )}

      <div className="fixed top-0 left-0 md:left-64 right-0 z-50">
        <div
          className={`fixed top-0 right-0 z-50 bg-[#1A2438] transition-all ${
            isAdmin ? "md:left-64 left-0" : "left-0"
          }`}
        >
          <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        </div>

        <main className="flex-1 pt-20 px-4 lg:px-8">
          <div className="max-w-6xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
