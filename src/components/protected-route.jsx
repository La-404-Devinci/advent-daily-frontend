import { Navigate } from "react-router-dom";
import { isAuthenticated, isGranterAuthenticated } from "../libs/functions";

const ProtectedRoute = ({ children, asGranter }) => {
    if (!isAuthenticated() && !asGranter) {
        return <Navigate to="/login" />;
    }
    if (!isGranterAuthenticated() && asGranter) {
        return <Navigate to="/admin/login" />;
    }
    return children;
};

export default ProtectedRoute;
