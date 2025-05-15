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

  const signUp = async (user) => {
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

  const signIn = async (user) => {
    try {
      const response = await login(user);
      Cookies.set("token", response.data.token, { expires: 1 });
      setUser(response.data.user);
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
    const checkLogin = async () => {
      const token = Cookies.get("token");
      if (!token) {
        setIsautenticated(false);
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRe(token);
        if (!res.data) {
          setIsautenticated(false);
          setUser(null);
        } else {
          setUser(res.data);
          setIsautenticated(true);
        }
      } catch (error) {
        setIsautenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  return (
    <authContext.Provider
      value={{ signUp, signIn, logout, isAutenticated, user, loading }}
    >
      {children}
    </authContext.Provider>
  );
};
