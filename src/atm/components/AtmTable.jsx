import { useEffect, useState } from "react";
import { getAtm, deleteAtm } from "../api";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";

export default function AtmTable() {
  const [atm, setAtm] = useState([]);
  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Obtener cajeros al montar el componente
  useEffect(() => {
    getAtm()
      .then((res) => {
        setAtm(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener cajeros", err);
      });
  }, []);

  const handleDeleteAtm = async (id) => {
    setSelectedId(id);
    setShowConfirm(true);
  };
  const confirmDelete = async () => {
    try {
      await deleteAtm(selectedId);
      const res = await getAtm();
      setAtm(res.data);
      setShowConfirm(false);
      setSelectedId(null);
    } catch (error) {
      console.error("Error al eliminar el cajero", error);
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setSelectedId(null);
  };

  const handleCreateAtm = () => {
    navigate("/atm/create"); // Cambia esta ruta según tu sistema
  };

  return (
    <div className="flex justify-center">
      <div className="bg-[#263556] p-5 rounded max-w-4xl w-full overflow-hidden">
        <div className="overflow-auto max-h-96">
          <table className="min-w-full border-separate border-spacing-0 rounded-lg overflow-hidden">
            <thead className="bg-[#1A2438]">
              <tr>
                <th className="px-4 py-2 rounded-tl-lg text-left text-white">
                  NOMBRE
                </th>
                <th className="px-4 py-2 text-left text-white">CI</th>
                <th className="px-4 py-2 text-left text-white">EMAIL</th>
                <th className="px-4 py-2 rounded-tr-lg text-white">
                  OPERACIONES
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#2E3A4B]">
              {atm.map((atms) => (
                <tr key={atms.id}>
                  <td className="px-4 py-2 text-white">{atms.fullName}</td>
                  <td className="px-4 py-2 text-white">{atms.ci}</td>
                  <td className="px-4 py-2 text-white">{atms.email}</td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded mr-2 hover:bg-red-600"
                      onClick={() => handleDeleteAtm(atms.id)}
                    >
                      <FaTrash />
                    </button>
                    <button
                      onClick={() => navigate(`/atm/edit/${atms.id}`)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleCreateAtm}
            className="bg-amber-400 text-white px-4 py-1 rounded hover:border"
          >
            Nuevo cajero
          </button>
        </div>
      </div>

      {/* Modal de confirmación */}
      {showConfirm && (
        <div className="fixed inset-0 bg-fondo bg-opacity-2 flex items-center justify-center z-50">
          <div className="bg-blue-950 p-6 rounded shadow-md w-full max-w-sm text-center">
            <h2 className="text-lg font-semibold mb-4">¿Eliminar cajero?</h2>
            <p className="text-gray-700 mb-6">
              Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Eliminar
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
