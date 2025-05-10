import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../../firebase/credentials";
import { doc, getDoc, setDoc, addDoc, collection } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function FormAtm({ modo = "crear" }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");


  //obtenemos al usuario actual
  
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Si es edición, traer datos del ATM
  useEffect(() => {
    const fetchAtm = async () => {
      if (modo === "editar" && id) {
        const docRef = doc(db, "atm", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name || "");
          setPhone(data.phone || "");
          setEmail(data.email || "");
          setPassword(data.password || "");
        }
      }
    };

    fetchAtm();
  }, [modo, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const atmData = {
      name,
      password,
      phone,
      email,
      role: "user",
      uid: user.uid, // Asocia el ATM al usuario actual
    };

    try {
      if (modo === "crear") {
        await addDoc(collection(db, "atm"), atmData);
      } else {
        await setDoc(doc(db, "atm", id), atmData);
      }

      navigate("/atm");
    } catch (error) {
      console.error("Error al guardar ATM:", error);
    }
  };

  return (
    <div className="flex justify-center bg-[#2E3A4B] flex-col w-150 rounded ml-50 mr-50">
      <div className="bg-[#131C31] text-center h-10 rounded-t font-bold text-white flex items-center justify-center">
        <h1>{modo === "crear" ? "NEW ATM" : "EDIT ATM"}</h1>
      </div>

      <div className="flex justify-center m-5">
        <form
          onSubmit={handleSubmit}
          className="bg-[#29292D] p-5 w-80 rounded text-white"
        >
          <div className="flex flex-col mt-5">
            <label>NOMBRE DEL CAJERO</label>
            <input
              type="text"
              className="bg-[#ffffffad] rounded text-black mt-2 h-8 p-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col mt-5">
            <label>EMAIL DEL CAJERO</label>
            <input
              type="email"
              className="bg-[#ffffffad] rounded text-black mt-2 h-8 p-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col mt-5">
            <label>NUMERO DE CELULAR CAJERO</label>
            <input
              type="text"
              className="bg-[#ffffffad] rounded text-black mt-2 h-8 p-3"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col mt-5">
            <label>PASSWORD DEL CAJERO</label>
            <input
              type="password"
              className="bg-[#ffffffad] rounded text-black mt-2 h-8 p-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-center mt-5">
            <button
              type="submit"
              className="bg-amber-400 text-white px-4 py-1 rounded hover:border"
            >
              {modo === "crear" ? "Crear ATM" : "Guardar cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
