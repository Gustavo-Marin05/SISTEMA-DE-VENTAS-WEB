import { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
export default function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [ci, setCi] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null); // 👉 estado para el error

  const [showPassword, setShowPassword] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null); // limpiar error anterior

    const userData = { fullName, ci, email, password };
    try {
      await register(userData);
      navigate("/login");
    } catch (error) {
      // extraer mensaje del backend (puede ser string o array)
      const message = error.response?.data?.message;
      if (Array.isArray(message)) {
        setErrorMessage(message.join("\n"));
      } else {
        setErrorMessage(message || "Error desconocido");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="shadow-lg rounded-2xl p-8 w-full max-w-md space-y-6 bg-gray-600"
      >
        <h2 className="text-2xl font-bold text-center text-white">
          Registrarse
        </h2>

        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded-xl whitespace-pre-line">
            {errorMessage}
          </div>
        )}

        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Nombre completo"
          required
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="text"
          value={ci}
          onChange={(e) => setCi(e.target.value)}
          placeholder="Cédula de Identidad (CI)"
          required
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          required
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
            className="w-full p-3 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition"
        >
          Crear cuenta
        </button>

        <div className="text-center">
          <p className="text-white">¿Ya tienes cuenta?</p>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="mt-2 text-green-300 hover:underline"
          >
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  );
}
