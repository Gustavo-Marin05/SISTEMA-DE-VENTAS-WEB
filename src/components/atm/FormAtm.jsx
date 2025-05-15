import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { createAtm, getAtmById} from "../../api/atm"; // Asegúrate de tener updateAtm

export default function FormAtm({ modo = "crear" }) {
  const navigate = useNavigate();
  const { id } = useParams(); // solo para editar

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    ci: "",
    password: ""
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (modo === "editar" && id) {
      getAtmById(id)
        .then((res) => {
          const atm = res.data;
          setFormData({
            fullName: atm.fullName,
            ci: atm.ci,
            email: atm.email,
            password: "" // no se edita desde aquí
          });
        })
        .catch((err) => {
          console.error("Error al obtener el cajero:", err);
          setError("Error al obtener datos del cajero");
        });
    }
  }, [modo, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (modo === "crear") {
        await createAtm(formData);
      } else if (modo === "editar" && id) {
        const updatedData = {
          fullName: formData.fullName,
          email: formData.email,
          ci: formData.ci
          // NO incluimos password en edición si no se va a cambiar
        };
       
      }
      navigate("/atm");
    } catch (error) {
      console.error("Error al procesar el cajero:", error);
      setError("Error al guardar el cajero. Verifica los datos.");
    }
  };

  return (
    <div className="flex justify-center bg-[#2E3A4B] flex-col w-150 rounded ml-50 mr-50">
      <div className="bg-[#131C31] text-center h-10 rounded-t font-bold">
        <h1>{modo === "crear" ? "NEW ATM" : "EDIT ATM"}</h1>
      </div>

      <div className="flex justify-center m-5">
        <form onSubmit={handleSubmit} className="bg-[#29292D] p-5 w-80 rounded">
          {error && (
            <p className="text-red-500 text-center font-semibold">{error}</p>
          )}

          <div className="flex flex-col mt-5">
            <label>NOMBRE DEL CAJERO</label>
            <input
              name="fullName"
              type="text"
              className="bg-[#ffffffad] rounded text-black mt-2 h-8 p-3"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col mt-5">
            <label>CI CAJERO</label>
            <input
              name="ci"
              type="text"
              className="bg-[#ffffffad] rounded text-black mt-2 h-8 p-3"
              value={formData.ci}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col mt-5">
            <label>EMAIL</label>
            <input
              name="email"
              type="email"
              className="bg-[#ffffff86] rounded text-black mt-2 h-8 p-3"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {modo === "crear" && (
            <div className="flex flex-col mt-5">
              <label>CONTRASEÑA</label>
              <input
                name="password"
                type="password"
                className="bg-[#ffffff86] rounded text-black mt-2 h-8 p-3"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="flex justify-center mt-5">
            <button
              type="submit"
              className="bg-amber-400 text-white px-4 py-1 rounded hover:border"
            >
              {modo === "crear" ? "Crear Cajero" : "Editar Cajero"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
