import { BrowserRouter as Router } from "react-router-dom";
import AppRoute from "./AppRoute";
import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
