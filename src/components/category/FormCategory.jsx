import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../../firebase/credentials";
import { collection, addDoc, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function FormCreateCategory({ modo = 'crear' }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState('');
  const [user, setUser] = useState(null);

  // Obtener usuario actual
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

  // Si es edición, traer la categoría
  useEffect(() => {
    const cargarCategoria = async () => {
      if (modo === 'editar' && id) {
        const docRef = doc(db, "categories", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name || '');
        }
      }
    };
    cargarCategoria();
  }, [modo, id]); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    const categoryData = {
      name,
      uid: user.uid, // Asocia la categoría con el usuario logueado
      cantidadProductos: 0
    };

    if (modo === 'crear') {
      await addDoc(collection(db, "categories"), categoryData);
    } else {
      await setDoc(doc(db, "categories", id), categoryData);
    }

    navigate('/category');
  };

  return (
    <div className="flex justify-center bg-[#2E3A4B] flex-col w-150 rounded ml-50 mr-50">
      <div className="bg-[#131C31] text-center h-10 rounded-t">
        <h1>{modo === 'crear' ? 'NEW CATEGORY' : 'EDIT CATEGORY'}</h1>
      </div>

      <div className="flex justify-center m-5">
        <form onSubmit={handleSubmit} className="bg-[#29292D] p-5 w-80 rounded">
          <div className="flex flex-col mt-5">
            <label>NOMBRE DE LA CATEGORÍA</label>
            <input
              type="text"
              className="bg-[#ffffffad] rounded text-black mt-2 h-8 p-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-center mt-5">
            <button
              type="submit"
              className="bg-amber-400 text-white px-4 py-1 rounded hover:border"
            >
              {modo === 'crear' ? 'Create Category' : 'Edit Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
