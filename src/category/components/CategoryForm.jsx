import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createCategory, getCategoryById, updateCategory } from "../api";

export default function CategoryForm({ modo = "crear" }) {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoryData = { name };

    try {
      if (modo === "crear") {
        await createCategory(categoryData);
      } else {
        await updateCategory(categoryData, id);
      }
      navigate("/category");
    } catch (error) {
      console.error("Error al guardar la categoría:", error);
    }
  };

  useEffect(() => {
    if (modo === "editar" && id) {
      getCategoryById(id)
      
        .then((res) => {
          console.log("ID desde useParams:", id);
          setName(res.data.name || "");
        })
        .catch((err) => {
          console.error("Error al obtener categoría:", err);
        });
    }
  }, [modo, id]);

  return (
    <div className="flex items-center justify-center ">
      <div className="w-full max-w-md bg-[#2E3A4B] border-2 border-[#29292D] rounded-lg shadow-lg">
        <div className="text-center px-6 pt-6">
          <h2 className="text-2xl font-bold text-white">
            {modo === "crear" ? "Crear Categoría" : "Editar Categoría"}
          </h2>
          <p className="text-gray-300 text-sm mt-1">
            Ingresa el nombre de la {modo === "crear" ? "nueva " : ""}categoría
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="category-name"
              className="block text-white font-medium"
            >
              Nombre de la categoría
            </label>
            <input
              id="category-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Electrónicos, Ropa, Hogar..."
              className="w-full px-4 py-2 bg-[#29292D] text-white border border-[#29292D] rounded-md placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-400"
            />
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-md transition"
            >
              {modo === "crear" ? "Crear Categoría" : "Actualizar Categoría"}
            </button>
            <button
              type="button"
              className="w-full border border-[#29292D] text-gray-300 hover:bg-[#29292D] hover:text-white py-2.5 rounded-md transition"
              onClick={() => navigate("/category")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
