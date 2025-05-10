import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/credentials";
import { doc, getDoc } from "firebase/firestore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Iniciar sesión
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Obtener datos del usuario desde la colección "usuarios"
      const userDoc = await getDoc(doc(db, "usuarios", user.uid));

      if (!userDoc.exists()) {
        alert("Usuario no encontrado en la base de datos.");
        return;
      }

      const userData = userDoc.data();

      if (userData.rol === "admin") {
        navigate("/home");
      } else if (userData.rol === "user") {
        // Verificar si es un ATM por existencia en colección "atm"
        const atmDoc = await getDoc(doc(db, "atm", user.uid));

        if (atmDoc.exists()) {
          navigate("/atm"); // Página para ATM
        } else {
          navigate("/product"); // Página para usuario normal
        }
      } else {
        alert("Rol no reconocido.");
      }

    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Correo o contraseña incorrectos.");
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
            <label className="block text-sm font-medium text-white">Email</label>
            <input
              type="email"
              className="mt-2 p-2 w-full border bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Introduce tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
