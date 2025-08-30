import { useNavigate } from "react-router-dom";
import { Categories, deleteCategory } from "../api";
import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

export default function TableCategory() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const handleCreateCategory = () => {
    navigate("/category/create");
  };

  useEffect(() => {
    Categories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener categorías", err);
      });
  }, []);

  const handledeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    } catch (err) {
      console.error("Error al eliminar categoría", err);
    }
  };

  return (
    <div className="flex justify-center px-2">
      <div className="bg-[#263556] p-4 md:p-5 rounded w-full max-w-full overflow-hidden">
        {/* Contenedor con scroll horizontal solo si es necesario */}
        <div className="overflow-x-auto">
          <table className="w-full md:min-w-[700px] table-auto border-separate border-spacing-0 rounded-lg overflow-hidden text-sm md:text-base">
            <thead className="bg-[#1A2438]">
              <tr>
                <th className="px-2 md:px-4 py-2 rounded-tl-lg text-left text-white">
                  CATEGORIA
                </th>
                <th className="px-2 md:px-4 py-2 text-left text-white">
                  CANT. PRODUCTOS
                </th>
                <th className="px-2 md:px-4 py-2 text-left text-white">
                  OPERACIONES
                </th>
              </tr>
            </thead>

            <tbody className="bg-[#2E3A4B] text-white text-center">
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="px-2 md:px-4 py-2">{category.name}</td>
                  <td className="px-2 md:px-4 py-2">
                    {category.Product?.length || 0}
                  </td>
                  <td className="px-2 md:px-4 py-2 flex gap-2 justify-center">
                    <button
                      className="bg-red-500 text-white px-2 md:px-4 py-1 rounded hover:bg-red-600"
                      onClick={() => handledeleteCategory(category.id)}
                    >
                      <FaTrash />
                    </button>
                    <button
                      className="bg-blue-500 text-white px-2 md:px-4 py-1 rounded hover:bg-blue-600"
                      onClick={() =>
                        navigate(`/category/update/${category.id}`)
                      }
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Botón crear categoría */}
        <div className="flex justify-center mt-4 md:mt-6">
          <button
            className="bg-amber-400 text-white px-4 py-1 rounded hover:border"
            onClick={handleCreateCategory}
          >
            New Category
          </button>
        </div>
      </div>
    </div>
  );
}
