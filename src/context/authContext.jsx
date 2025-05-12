// context/authContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { login, logoutre, register, verifyTokenRe } from "../api/auh";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context)
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAutenticated, setIsautenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const sinup = async (user) => {
    try {
      const response = await register(user);
      console.log(response.data);
      setUser(response.data);
      setIsautenticated(true);
      return { success: true };
    } catch (error) {
      return {
        error: true,
        message: error.response?.data?.message || "Error en el registro",
      };
    }
  };

  const sigin = async (user) => {
    try {
      const response = await login(user);
      // Guarda el token en cookies
      Cookies.set("token", response.data.token, { expires: 1 }); // 1 día
      console.log(response);
      setUser(response.data.user); // <-- asegúrate de que la propiedad sea 'user'
      setIsautenticated(true);
      return { success: true };
    } catch (error) {
      return {
        error: true,
        message: error.response?.data?.message || "Error al iniciar sesión",
      };
    }
  };
  const logout = async () => {
    try {
      await logoutre();
    } catch (error) {
      console.error("Error en logout:", error);
    }

    setUser(null);
    setIsautenticated(false);
    Cookies.remove("token");
    navigate("/login");
  };

  useEffect(() => {
    async function cheklogin() {
      const token = Cookies.get("token");

      if (!token) {
        setIsautenticated(false)
        setLoading(false)
        return setUser(null);
      }
        try {
          const res = await verifyTokenRe(token); // debe devolver los datos del usuario
          console.log(res);
          if (!res.data) {
            setIsautenticated(false);
            setLoading(false);
            return;
          }
          setUser(res.data); // <- o res.data dependiendo de tu backend
          setIsautenticated(true);
          setLoading(false);
        } catch (error) {
          setIsautenticated(false);
          setUser(null);
          setLoading(false);
        }
      
    }

    cheklogin();
  }, []);

  return (
    <authContext.Provider
      value={{ sinup, sigin, logout, isAutenticated, user ,loading}}
    >
      {children}
    </authContext.Provider>
  );
};
