import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, userRole }) => {
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />; 
    }

    if (userRole !== "vendor") {
        return <Navigate to="/" replace />; 
    }

    return <Outlet />; 
};

export default ProtectedRoute;
