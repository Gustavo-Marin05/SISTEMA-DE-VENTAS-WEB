import { Routes, Route, Navigate } from "react-router-dom"; 
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Layout from "./components/layout";  // Componente principal del diseño
import Products from "./pages/dashboard/Products";
import Category from "./pages/dashboard/category";
import Atm from "./pages/dashboard/atm";
import FormCreateProduct from "./components/products/FormCreateProduct";
import FormCategory from "./components/category/FormCategory";
import FormAtm from "./components/atm/FormAtm";
import Home from "./pages/dashboard/home";
import PrivateRoute from "./components/PrivateRoute";
import Atmdashboard from "./pages/dashboardAtm/atmdash";
import AdminRoute from "./context/adminRoute";
import UserRoute from "./context/userRoute";
import UserLayout from "./components/componentsAtmDashboard/userLayout";
import Customer from "./pages/dashboard/customer";

function AppRoute() {
  return (
    <Routes>
      {/* Rutas públicas (sin Sidebar) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rutas privadas, protegidas por PrivateRoute (con Sidebar) */}
      <Route element={<PrivateRoute />}>
        {/* Ruta protegida por AdminRoute para el Layout y todas las rutas dentro */}
        <Route element={<AdminRoute />}>
          <Route path="/" element={<Layout />}>
            {/* Redirige desde "/" a "/home" */}
            <Route index element={<Navigate to="home" replace />} />

            {/* Rutas protegidas solo para admins */}
            <Route path="home" element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="category" element={<Category />} />
            <Route path="customer" element={<Customer />} />
            <Route path="atm" element={<Atm />} />
            <Route path="products/create" element={<FormCreateProduct modo="crear" />} />
            <Route path="products/edit/:id" element={<FormCreateProduct modo="editar" />} />
            <Route path="category/create" element={<FormCategory modo="crear" />} />
            <Route path="category/edit/:id" element={<FormCategory modo="editar" />} />
            <Route path="atm/create" element={<FormAtm modo="crear" />} />
            <Route path="atm/edit/:id" element={<FormAtm modo="editar" />} />
          </Route>
        </Route>

        {/* Rutas para el role tipo user */}
        <Route element={<UserRoute />}>
          <Route element={<UserLayout />}>
          {/* Aquí puedes agregar más rutas específicas para usuarios normales */}
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Atmdashboard />} />
          </Route>
        </Route>

        
      </Route>
    </Routes>
  );
}

export default AppRoute;
