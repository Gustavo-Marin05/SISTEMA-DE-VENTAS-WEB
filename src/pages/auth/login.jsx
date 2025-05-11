import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Importamos Axios
export default function Login() {
  const [ci, setCi] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/api/login", {
        ci: ci,
        password: password,
      });

      const userData = response.data;

      // Redirección según el rol
      if (userData.role === "ADMIN") {
        navigate("/home");
      } else if (userData.role === "USER") {
        navigate("/product");
      } else if (userData.role === "ATM") {
        navigate("/atm");
      } else {
        alert("Rol no reconocido.");
      }

    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert(error?.response?.data?.message || "Correo o contraseña incorrectos.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-custom">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-sm bg-form">
        <h2 className="text-2xl p-5 font-bold mb-6 text-center text-white">
          Bienvenido, inicia sesión
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">CI</label>
            <input
              type="text"
              className="mt-2 p-2 w-full border bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Introduce tu CI"
              value={ci}
              onChange={(e) => setCi(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-white">Contraseña</label>
            <input
              type="password"
              className="mt-2 p-2 w-full border bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Introduce tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 rounded-md text-white font-semibold 
              bg-gradient-to-r from-[#0A0F1A] via-[#344980] to-[#0A0F1A] 
              hover:via-[#121c30] focus:outline-none transition-all duration-300"
          >
            Iniciar sesión
          </button>
        </form>
        <p className="mt-4 text-center text-white">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-blue-500">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}
