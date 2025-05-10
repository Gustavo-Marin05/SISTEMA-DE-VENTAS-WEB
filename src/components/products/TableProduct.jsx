import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase/credentials";
import { collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";

export default function TableProduct() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categorias, setCategorias] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        // Obtener categorías del usuario
        const catQuery = query(
          collection(db, "categories"),
          where("uid", "==", user.uid)
        );
        const catSnapshot = await getDocs(catQuery);
        const catMap = {};
        catSnapshot.docs.forEach((doc) => {
          catMap[doc.id] = doc.data().name;
        });
        setCategorias(catMap);

        // Obtener productos del usuario
        const prodQuery = query(
          collection(db, "products"),
          where("uid", "==", user.uid)
        );
        const prodSnapshot = await getDocs(prodQuery);
        const productosObtenidos = prodSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productosObtenidos);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, [user]);

  const handleCreateProduct = () => {
    navigate("/products/create");
  };

  const handleEditProduct = (id) => {
    navigate(`/products/edit/${id}`);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="bg-[#263556] p-5 rounded max-w-3xl w-full overflow-hidden">
        <div className="overflow-auto max-h-96">
          <table className="min-w-full border-separate border-spacing-0 rounded-lg overflow-hidden">
            <thead className="bg-[#1A2438]">
              <tr>
                <th className="px-4 py-2 rounded-tl-lg text-left text-white">PRODUCTS</th>
                <th className="px-4 py-2 text-left text-white">STOCK</th>
                <th className="px-4 py-2 text-left text-white">PRICE</th>
                <th className="px-4 py-2 text-left text-white">CATEGORY</th>
                <th className="px-4 py-2 rounded-tr-lg text-white">OPERATIONS</th>
              </tr>
            </thead>

            <tbody className="text-white text-center bg-[#2E3A4B]">
              {products.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-4">No hay productos.</td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-4 py-2 text-left">{product.nombre}</td>
                    <td className="px-4 py-2 text-left">{product.stock}</td>
                    <td className="px-4 py-2 text-left">${product.price}</td>
                    <td className="px-4 py-2 text-left">
                      {categorias[product.categoria] || "Sin categoría"}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="bg-red-500 text-white px-4 py-1 rounded mr-2 hover:bg-red-600"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleEditProduct(product.id)}
                        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleCreateProduct}
            className="bg-amber-400 text-white px-4 py-1 rounded mr-2 hover:border"
          >
            New Product
          </button>
        </div>
      </div>
    </div>
  );
}
