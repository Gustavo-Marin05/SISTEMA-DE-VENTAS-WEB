import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function FormCategory({ modo = "crear", categoria = {} }) {
  const navigate = useNavigate();

  // Estado de los inputs
  const [nombre, setNombre] = useState("");
 

  // Si es edición, llenar los campos
  useEffect(() => {
    if (modo === "editar" && categoria) {
      setNombre(categoria.nombre || "");
    
    }
  }, [modo, categoria]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modo === "crear") {
      // Lógica para crear producto
      console.log("Crear categoria", { nombre, cantProduct });
    } else {
      // Lógica para editar producto
      console.log("Editar categoria", { nombre, cantProduct });
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
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
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
