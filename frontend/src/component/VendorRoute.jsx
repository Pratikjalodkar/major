import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, userRole }) => {
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />; // Redirect to login if not authenticated
    }

    if (userRole !== "vendor") {
        return <Navigate to="/" replace />; // Redirect if not a vendor
    }

    return <Outlet />; // Render child routes
};

export default ProtectedRoute;
