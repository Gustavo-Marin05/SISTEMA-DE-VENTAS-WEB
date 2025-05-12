import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { createCategory, updateCategory ,getCategoryById } from "../../api/category";


export default function FormCategory({ modo = "crear" }) {
  const navigate = useNavigate();
  const { id } = useParams(); // solo para modo editar
  const [name, setName] = useState("");

  // Obtener categoría si estamos en modo edición
  useEffect(() => {
  if (modo === "editar" && id) {
    getCategoryById(id)
      .then((res) => {
        setName(res.data.name || "");
      })
      .catch((err) => {
        console.error("Error al obtener categoría:", err);
      });
  }
}, [modo, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoryData = { name };

    if (modo === "crear") {
      await createCategory(categoryData);
    } else {
      await updateCategory(categoryData,id);
    }

    navigate("/category");
  };

  return (
    <div className="flex justify-center bg-[#2E3A4B] flex-col w-150 rounded ml-50 mr-50">
      <div className="bg-[#131C31] text-center h-10 rounded-t">
        <h1>{modo === "crear" ? "NEW CATEGORY" : "EDIT CATEGORY"}</h1>
      </div>
      <div className="flex justify-center m-5">
        <form onSubmit={handleSubmit} className="bg-[#29292D] p-5 w-80 rounded">
          <div className="flex flex-col mt-5">
            <label>NOMBRE DE LA CATEGORIA</label>
            <input
              type="text"
              className="bg-[#ffffffad] rounded text-black mt-2 h-8 p-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex justify-center mt-5">
            <button
              type="submit"
              className="bg-amber-400 text-white px-4 py-1 rounded hover:border"
            >
              {modo === "crear" ? "Create Category" : "Edit Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
