import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSuccess = async (credentials) => {
    try {
      const user = await login(credentials);
      if (user.role === "ADMIN") {
        navigate("/admin");
      } else if (user.role === "USER") {
        navigate("/user");
      } else {
        navigate("/login"); // fallback
      }
    } catch (error) {
      console.error("Error en login:", error);
    }
  };

  return <LoginForm onSuccess={handleSuccess} />;
}
