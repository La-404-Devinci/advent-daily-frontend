import { Navigate } from "react-router-dom";
import { isAuthenticated, isAdmin } from "../libs/functions";


const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return children;
};

const AdminProtectedRoute = ({ children }) => {
  if (!isAdmin() && !isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return children;
};

export { AdminProtectedRoute, ProtectedRoute,  };