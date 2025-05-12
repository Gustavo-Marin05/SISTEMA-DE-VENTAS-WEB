import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

export default function Login() {
 
 
  const [email, setEmail] = useState(""); // <-- nuevo estado
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { sigin } = useAuth();
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = {
        email: email,
        password: password,
      };

      const response = await sigin(user);

      if (response.error) {
        alert(response.message || "Error al registrar");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      if (error.response && error.response.data) {
        console.error("Mensaje del backend:", error.response.data.message);
      } else {
        console.error("Error desconocido");
      }
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
            <label className="block text-sm font-medium text-white">
              Email
            </label>
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
