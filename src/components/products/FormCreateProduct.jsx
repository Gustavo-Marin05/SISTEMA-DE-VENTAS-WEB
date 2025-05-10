import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase/credentials";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export default function FormCreateProduct() {
  const navigate = useNavigate();
  const { id } = useParams(); // ID para edición
  const [modo, setModo] = useState("crear");

  const [user, setUser] = useState(null);
  const [nombre, setNombre] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [categoria, setCategoria] = useState("");
  const [categoriasDisponibles, setCategoriasDisponibles] = useState([]);

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
    if (user) {
      const fetchCategorias = async () => {
        const q = query(collection(db, "categories"), where("uid", "==", user.uid));
        const snapshot = await getDocs(q);
        const categorias = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategoriasDisponibles(categorias);
      };

      fetchCategorias();
    }
  }, [user]);

  useEffect(() => {
    if (id) {
      setModo("editar");
      const fetchProduct = async () => {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setNombre(data.nombre || "");
          setStock(data.stock || "");
          setPrice(data.price || "");
          setCategoria(data.categoria || "");
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !stock || !price || !categoria) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const productData = {
      nombre,
      stock: parseInt(stock),
      price: parseFloat(price),
      categoria,
      uid: user.uid,
    };

    try {
      if (modo === "crear") {
        await addDoc(collection(db, "products"), productData);
        console.log("Producto creado");
      } else {
        const docRef = doc(db, "products", id);
        await updateDoc(docRef, productData);
        console.log("Producto actualizado");
      }
      navigate("/products");
    } catch (error) {
      console.error("Error al guardar producto:", error);
    }
  };

  return (
    <div className="flex justify-center bg-[#2E3A4B] flex-col w-full max-w-md mx-auto rounded">
      <div className="bg-[#131C31] text-center py-2 rounded-t">
        <h1 className="text-white text-lg font-bold">
          {modo === "crear" ? "NEW PRODUCT" : "EDIT PRODUCT"}
        </h1>
      </div>

      <div className="flex justify-center m-5">
        <form onSubmit={handleSubmit} className="bg-[#29292D] p-5 w-full rounded text-white">
          <div className="flex flex-col mt-5">
            <label>NOMBRE DEL PRODUCTO</label>
            <input
              type="text"
              className="bg-white rounded text-black mt-2 h-8 p-3"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="flex flex-col mt-5">
            <label>STOCK</label>
            <input
              type="number"
              className="bg-white rounded text-black mt-2 h-8 p-3"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>

          <div className="flex flex-col mt-5">
            <label>PRICE</label>
            <input
              type="number"
              className="bg-white rounded text-black mt-2 h-8 p-3"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="flex flex-col mt-5">
            <label>CATEGORÍA</label>
            <select
              className="bg-white rounded text-black mt-2 h-8 p-2"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">Seleccione una categoría</option>
              {categoriasDisponibles.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center mt-6">
            <button type="submit" className="bg-green-500 px-6 py-2 rounded hover:bg-green-600">
              {modo === "crear" ? "Crear" : "Actualizar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
