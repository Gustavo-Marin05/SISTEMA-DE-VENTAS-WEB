// src/components/PrivateRoute.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/credentials";

export default function PrivateRoute({ children }) {
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Verifica el rol desde Firestore
        const docRef = doc(db, "usuarios", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const role = docSnap.data().rol; // Usar 'rol' en lugar de 'role'
          setAuthorized(role === "admin"); // solo permitimos admin
        } else {
          console.log("No se encontró el usuario en Firestore.");
          setAuthorized(false); // si no hay datos del usuario en Firestore, se marca como no autorizado
        }
      } else {
        setAuthorized(false);
      }
      setChecking(false);
    });

    return () => unsubscribe();
  }, []);

  if (checking)
    return <div className="text-black text-center mt-10">Cargando...</div>;

  if (!authorized) return <Navigate to="/login" replace />;

  return children;
}
