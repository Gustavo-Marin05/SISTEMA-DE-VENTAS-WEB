import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";

const PrivateRoute = ({ requiredRole }) => {
  const {loading,isAutenticated}=useAuth()

  console.log( loading, isAutenticated)

  if(loading) return <h1>loadin</h1>
  if(!loading && !isAutenticated){
    return <Navigate to='/login' replace/>
  }

  return(
    <Outlet/>
  )
};

export default PrivateRoute;
