import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Layout from "../components/Layout";

const PrivateRoute = ({ children, tipoUsuario: requiredRole }) => {
  const { token, tipoUsuario } = useAuth();

  if (!token) {
    return <Navigate to="/" />;
  }

  if (requiredRole && tipoUsuario !== requiredRole) {
    return <h1>Acesso não autorizado</h1>;
  }

  return <Layout>{children}</Layout>;
};

export default PrivateRoute;