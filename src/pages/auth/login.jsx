import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState(""); // Campo de email
  const [password, setPassword] = useState(""); // Campo de contraseña
  const navigate = useNavigate(); // Hook de navegación

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "http://localhost:4000/api/login",
      {
        email,
        password,
      },
      {
        // Permite que las cookies HTTP-only funcionen si decides usarlas
        withCredentials: true,
      }
    );

    // Guardar tanto el token como el role en localStorage
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("role", response.data.role);

    console.log("Login exitoso");

    // Redirige al usuario según su rol
    if (response.data.role === "ADMIN") {
      navigate("/home");
    } else {
      navigate("/login");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Error al hacer login";
    alert(errorMessage);
    console.error("Login error:", errorMessage);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-custom">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-sm bg-form">
        <h2 className="text-2xl p-5 font-bold mb-6 text-center text-white">
          Bienvenido, inicia sesión
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">Email</label>
            <input
              type="email"
              className="mt-2 p-2 w-full border bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Introduce tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
