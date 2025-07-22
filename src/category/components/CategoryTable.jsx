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
    <div className="flex justify-center">
      <div className="bg-[#263556] p-5 rounded max-w-3xl w-full overflow-hidden">
        <div className="overflow-auto max-h-96">
          <table className="min-w-full border-separate border-spacing-0 rounded-lg overflow-hidden">
            <thead className="bg-[#1A2438]">
              <tr>
                <th className="px-4 py-2 rounded-tl-lg text-left text-white">
                  NAME CATEGORY
                </th>
                <th className="px-4 py-2 text-left text-white">
                  CANT. PRODUCT
                </th>
                <th className="px-4 py-2 text-left text-white">OPERATIONS</th>
              </tr>
            </thead>

            <tbody className="text-white text-center bg-[#2E3A4B]">
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="px-4 py-2">{category.name}</td>
                  <td className="px-4 py-2">
                    {category.Product?.length || 0}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-red-500 text-white px-4 py-1 rounded mr-2 hover:bg-red-600"
                      onClick={() => handledeleteCategory(category.id)}
                    >
                      <FaTrash/>
                    </button>
                    <button
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                      onClick={() => navigate(`/category/update/${category.id}`)}
                    >
                      <FaEdit/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-6">
          <button
            className="bg-amber-400 text-white px-4 py-1 rounded mr-2 hover:border"
            onClick={handleCreateCategory}
          >
            new Category
          </button>
        </div>
      </div>
    </div>
  );
}
