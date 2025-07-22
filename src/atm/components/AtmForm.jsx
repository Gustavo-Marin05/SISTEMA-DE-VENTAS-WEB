import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createUser, getAtmById, updateUser } from "../api";

export default function AtmForm({ modo = "crear" }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    ci: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      fullName: formData.fullName,
      ci: formData.ci,
      email: formData.email,
      password: formData.password,
    };
    try {
      if (modo === "crear") {
        await createUser(data);
      } else if (modo === "editar" && id) {
        console.log("hola", data);

        await updateUser(data, id);
      }

      navigate("/atm");
    } catch (error) {
      console.error(
        "Error al crear producto:",
        error.response?.data || error.message
      );
      setError("No se pudo crear el producto");
    }
  };


  //esto me rederiza para los campos para que pueda editar
  useEffect(() => {
    if (modo === "editar" && id) {
      getAtmById(id)
        .then((res) => {
          const { fullname, ci, email } = res.data;
          setFormData({
            fullName,
            ci,
            email,
            password
          });
        })
        .catch((err) => {
          console.error("Error al obtener productos:", err);
        });
    }
  },[modo,id]);

  return (
    <div className="flex items-center justify-center px-4">
      <div className="w-full max-w-150 bg-[#2E3A4B] border-2 border-[#29292D] rounded-lg shadow-lg">
        <div className="text-center px-6 pt-6">
          <h2 className="text-2xl font-bold text-white">
            {modo === "crear" ? "Crear Usuario" : "Editar Usuario"}
          </h2>
          <p className="text-gray-300 text-sm mt-1">
            {modo === "crear"
              ? "Registra un nuevo usuario"
              : "Actualiza los datos del usuario"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
          {error && (
            <div className="bg-red-500 text-white p-2 rounded text-center text-sm">
              {error}
            </div>
          )}

          {/* Nombre y CI en una fila */}
          <div className="flex gap-4">
            <div className="w-1/2 space-y-2">
              <label
                htmlFor="fullName"
                className="block text-white font-medium"
              >
                Nombre Completo
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Ej: Juan Pérez"
                className="w-full px-4 py-2 bg-[#29292D] text-white border border-[#29292D] rounded-md placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-400"
                required
              />
            </div>

            <div className="w-1/2 space-y-2">
              <label htmlFor="ci" className="block text-white font-medium">
                CI
              </label>
              <input
                id="ci"
                name="ci"
                type="text"
                value={formData.ci}
                onChange={handleChange}
                placeholder="Ej: 12345678"
                className="w-full px-4 py-2 bg-[#29292D] text-white border border-[#29292D] rounded-md placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-400"
                required
              />
            </div>
          </div>

          {/* Email y Contraseña en una fila */}
          <div className="flex gap-4">
            <div className="w-1/2 space-y-2">
              <label htmlFor="email" className="block text-white font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ej: juan@example.com"
                className="w-full px-4 py-2 bg-[#29292D] text-white border border-[#29292D] rounded-md placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-400"
                required
              />
            </div>

            <div className="w-1/2 space-y-2">
              <label
                htmlFor="password"
                className="block text-white font-medium"
              >
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Dejar en blanco si no deseas cambiarla"
                className="w-full px-4 py-2 bg-[#29292D] text-white border border-[#29292D] rounded-md placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-400"
                required={modo === "crear"}
              />
            </div>
          </div>

          {/* Botones */}
          <div className="space-y-3">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-md transition"
            >
              {modo === "crear" ? "Crear Usuario" : "Actualizar Usuario"}
            </button>
            <button
              type="button"
              className="w-full border border-[#29292D] text-gray-300 hover:bg-[#29292D] hover:text-white py-2.5 rounded-md transition"
              onClick={() => navigate("/atm")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
