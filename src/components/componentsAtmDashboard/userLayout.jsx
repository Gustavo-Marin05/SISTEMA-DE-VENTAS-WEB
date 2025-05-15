import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar";
// Importa aquí los componentes necesarios para el layout de usuarios

export default function UserLayout() {
  return (
    <div className="flex flex-col h-screen bg-[#1a253f]">
       <Navbar />
      <main className="flex justify-center">
      
        <Outlet /> 
      </main>
      
    </div>
  );
}