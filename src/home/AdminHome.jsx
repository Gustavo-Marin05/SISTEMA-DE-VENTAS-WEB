import { useAuth } from "../auth/AuthContext";


export default function AdminHome() {
  const { user } = useAuth();
  return (
    <div className=" p-4">
      hola
    </div>
  );
}
