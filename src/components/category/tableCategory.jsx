import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, doc, deleteDoc, query, where } from "firebase/firestore";
import { db } from "../../firebase/credentials";
import { getAuth } from "firebase/auth";

export default function TableCategory() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchCategories = async () => {
      if (!user) return;
      try {
        const q = query(collection(db, "categories"), where("uid", "==", user.uid));
        const snapshot = await getDocs(q);
        const categoryList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCategories(categoryList);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };

    fetchCategories();
  }, [user]);

  const handleCreateCategory = () => {
    navigate('/category/create');
  };

  const handleEditCategory = (id) => {
    navigate(`/category/edit/${id}`);
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteDoc(doc(db, "categories", id));
      setCategories(categories.filter(category => category.id !== id));
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
    }
  };

  return (
    <div className="bg-[#263556] p-5 rounded max-w-3xl w-full overflow-hidden">
      <div className="overflow-auto max-h-96">
        <table className="min-w-full border-separate border-spacing-0 rounded-lg overflow-hidden">
          <thead className="bg-[#1A2438]">
            <tr>
              <th className="px-4 py-2 rounded-tl-lg text-left text-white">NAME CATEGORY</th>
              <th className="px-4 py-2 text-left text-white">CANT. PRODUCT</th>
              <th className="px-4 py-2 text-left text-white">OPERATIONS</th>
            </tr>
          </thead>
          <tbody className="text-white text-center bg-[#2E3A4B]">
            {categories.map(category => (
              <tr key={category.id}>
                <td className="px-4 py-2">{category.name}</td>
                <td className="px-4 py-2">{category.cantidadProductos}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded mr-2 hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEditCategory(category.id)}
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
          onClick={handleCreateCategory}
          className="bg-amber-400 text-white px-4 py-1 rounded hover:border"
        >
          New Category
        </button>
      </div>
    </div>
  );
}
