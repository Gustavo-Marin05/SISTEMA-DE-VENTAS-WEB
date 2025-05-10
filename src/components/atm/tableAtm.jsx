import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../firebase/credentials";

export default function TableAtm() {
  const navigate = useNavigate();
  const [atms, setAtms] = useState([]);
  const [loading, setLoading] = useState(true); // Para manejar la carga

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // Obtener todos los documentos de la colección ATM
          const snapshot = await getDocs(collection(db, "atm"));
          const atmList = snapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .filter((atm) => atm.uid === currentUser.uid); // Filtrar por usuario actual

          setAtms(atmList);
        } catch (error) {
          console.error("Error al obtener ATMs:", error);
        } finally {
          setLoading(false);
        }
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleCreateAtm = () => {
    navigate("/atm/create");
  };

  const handleEditAtm = (id) => {
    navigate(`/atm/edit/${id}`);
  };

  const handleDeleteAtm = async (id) => {
    try {
      await deleteDoc(doc(db, "atm", id));
      setAtms((prevAtms) => prevAtms.filter((atm) => atm.id !== id));
    } catch (error) {
      console.error("Error al eliminar ATM:", error);
    }
  };

  if (loading) {
    return <div className="text-white">Cargando ATMs...</div>;
  }

  return (
    <div className="bg-[#263556] p-5 rounded max-w-3xl w-full overflow-hidden">
      <div className="overflow-auto max-h-96">
        <table className="min-w-full border-separate border-spacing-0 rounded-lg overflow-hidden">
          <thead className="bg-[#1A2438]">
            <tr>
              <th className="px-4 py-2 rounded-tl-lg text-left text-white">NAME ATM</th>
              <th className="px-4 py-2 text-left text-white">PASSWORD</th>
              <th className="px-4 py-2 text-left text-white">PHONE NUMBER</th>
              <th className="px-4 py-2 text-left text-white">EMAIL</th>
              <th className="px-4 py-2 text-left text-white">OPERATIONS</th>
            </tr>
          </thead>
          <tbody className="text-white text-center bg-[#2E3A4B]">
            {atms.length > 0 ? (
              atms.map((atm) => (
                <tr key={atm.id}>
                  <td className="px-4 py-2">{atm.name}</td>
                  <td className="px-4 py-2">{atm.password}</td>
                  <td className="px-4 py-2">{atm.phone}</td>
                  <td className="px-4 py-2">{atm.email}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDeleteAtm(atm.id)}
                      className="bg-red-500 text-white px-4 py-1 rounded mr-2 hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEditAtm(atm.id)}
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-white">
                  No hay ATMs registrados para este usuario.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={handleCreateAtm}
          className="bg-amber-400 text-white px-4 py-1 rounded hover:border"
        >
          New ATM
        </button>
      </div>
    </div>
  );
}
