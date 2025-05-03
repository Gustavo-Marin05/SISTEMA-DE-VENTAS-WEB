import { Routes, Route, Navigate } from "react-router-dom"; // Asegúrate de importar Navigate
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Layout from "./components/layout";
import Products from "./pages/dashboard/Products";
import Category from "./pages/dashboard/category";
import Atm from "./pages/dashboard/atm";
import Orders from "./pages/dashboard/orders";
import FormCreateProduct from "./components/products/FormCreateProduct";
import FormCategory from "./components/category/FormCategory";
import FormAtm from "./components/atm/FormAtm";
import Home from "./pages/dashboard/home";

function AppRoute() {
  return (
    <Routes>
      {/* Rutas públicas (sin Sidebar) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rutas privadas (con Sidebar) */}
      <Route path="/" element={<Layout />}>
        {/* Redirige desde "/" a "/home" */}
        <Route index element={<Navigate to="home" replace />} />

        {/* Otras rutas relativas */}
        <Route path="home" element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="category" element={<Category />} />
        <Route path="orders" element={<Orders />} />
        <Route path="atm" element={<Atm />} />
        <Route path="products/create" element={<FormCreateProduct />} />
        <Route path="products/edit/:id" element={<FormCreateProduct />} />
        <Route path="category/create" element={<FormCategory />} />
        <Route path="category/edit/:id" element={<FormCategory />} />
        <Route path="atm/create" element={<FormAtm />} />
        <Route path="atm/edit/:id" element={<FormAtm />} />
      </Route>
    </Routes>
  );
}

export default AppRoute;
