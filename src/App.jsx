import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";
import ProtectedRoute from "./auth/ProtectedRoute";
import SidebarLayout from "./components/SidebarLayout";
import AdminHome from "./home/AdminHome";
import CaategoryPage from "./category/categoryPage";
import CategoryForm from "./category/components/CategoryForm";
import ProductPage from "./product/ProductPage";
import ProductForm from "./product/components/ProductForm";
import AtmPage from "./atm/AtmPage";
import CustomerPage from "./customer/CustomerPage";
import AtmForm from "./atm/components/AtmForm";
import CustomerFacturas from "./customer/components/CustomerFacturas";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirige raíz a login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Rutas públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rutas protegidas para ADMIN */}
        <Route element={<ProtectedRoute requiredRole="ADMIN" />}>
          <Route element={<SidebarLayout />}>
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/category" element={<CaategoryPage/>}/>
            <Route path="/category/create" element={<CategoryForm modo="crear"/>}/>
            <Route path="/category/update/:id" element={<CategoryForm modo="editar"/>}/>

            {/* seccion para las rutas de los productos */}
            <Route path="/products" element={<ProductPage/>}/>
            <Route path="/products/create" element={<ProductForm modo="crear"/>}/>
            <Route path="/products/edit/:id" element={<ProductForm  modo="editar"/>} />




            {/* seccon para las rutas del atm */}
            <Route path="/atm" element={<AtmPage/>}/>
            <Route path="/atm/create" element={<AtmForm modo="crear"/>}/>
            <Route path="/atm/edit/:id" element={<AtmForm  modo="editar"/>} />





            {/* seccion para los clentes */}
            <Route path="/customer" element={<CustomerPage/>}/>
            <Route path="/customer/facturas/:id" element={<CustomerFacturas/>}/>





          </Route>
        </Route>

        {/* Rutas solo para USER */}
        <Route element={<ProtectedRoute requiredRole="USER" />}>
          {/* Aquí irían las rutas de USER */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;