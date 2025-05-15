import { useNavigate } from "react-router-dom";
import { delteAtm, getAllAtm } from "../../api/atm";
import { useEffect, useState } from "react";

export default function TableAtm() {
  const [atms, setAtms] = useState([]);
  const navigate = useNavigate();

  const handleCreateAtm = () => {
    navigate("/atm/create");
  };

  const handleEditAtm = (id) => {
    navigate(`/atm/edit/${id}`);
  };

  const handleDeleteAtm = async (id) => {
    console.log("Intentando eliminar el producto:");
    const confirmDelete = window.confirm("¿Seguro de borrar la categoría?");
    if (!confirmDelete) return;

    try {
      await delteAtm(id);
      const res = await getAllAtm();
      setAtms(res.data);
    } catch (error) {
      console.error("Error al eliminar categoría", error);
    }
  };

  useEffect(() => {
    getAllAtm()
      .then((res) => {
        setAtms(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener productos", err);
      });
  }, []);

  return (
    <div className="bg-[#263556] p-5 rounded max-w-3xl w-full overflow-hidden">
      <div className="overflow-auto max-h-96">
        <table className="min-w-full border-separate border-spacing-0 rounded-lg overflow-hidden ">
          <thead className="bg-[#1A2438] ">
            <tr>
              <th className="px-4 py-2 rounded-tl-lg text-left text-white">
                NAME ATM
              </th>
              <th className="px-4 py-2 text-left text-white">EMAIL</th>
              <th className="px-4 py-2 text-left text-white">CI</th>
              {/*  <th className="px-4 py-2 text-left text-white">PHONE NUMBER</th> */}
              <th className="px-4 py-2 text-left text-white">OPERATIONS</th>
            </tr>
          </thead>

          <tbody className="text-white text-center bg-[#2E3A4B]">
            {atms.map((atm) => (
              <tr key={atm.id}>
                <td className="px-4 py-2">{atm.fullName}</td>
                <td className="px-4 py-2">{atm.email}</td>

                <td className="px-4 py-2">{atm.ci}</td>
                {/* <td className="px-4 py-2"></td> */}
                <td className="px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-4 py-1 rounded mr-2 hover:bg-red-600"
                    onClick={() => handleDeleteAtm(atm.id)}
                  >
                    Delete
                  </button>
                  <button
                    onClick={handleEditAtm}
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
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
          className="bg-amber-400 text-white px-4 py-1 rounded mr-2 hover:border"
        >
          new Atm
        </button>
      </div>
    </div>
  );
}
