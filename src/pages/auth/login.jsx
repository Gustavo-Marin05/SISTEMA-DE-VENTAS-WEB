import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-custom">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-sm bg-form">
        <h2 className="text-2xl p-5 font-bold mb-6 text-center text-white">
          Vienvenido inicia session ya
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">CI</label>
            <input
              type="text"
              className="mt-2 p-2 w-full border bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Introduce tu CI"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Contraseña
            </label>
            <input
              type="password"
              className="mt-2 p-2 w-full border  bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Introduce tu contraseña"
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 rounded-md text-white font-semibold 
    bg-gradient-to-r from-[#0A0F1A] via-[#344980] to-[#0A0F1A] 
     hover:via-[#121c30]  
    focus:outline-none transition-all duration-300"
          >
            Iniciar sesión
          </button>
        </form>
        <p className="mt-4 text-center text-white">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-blue-500">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}
