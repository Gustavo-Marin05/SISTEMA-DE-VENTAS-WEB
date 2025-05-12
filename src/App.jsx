import { BrowserRouter as Router } from "react-router-dom";
import AppRoute from "./AppRoute";
import { AuthProvider } from "./context/authContext";


function App() {
  return (
    <>
    <Router>
      <AuthProvider> 
        <AppRoute />
      </AuthProvider>
    </Router>
    

    </>
    
    
  );
}

export default App;
