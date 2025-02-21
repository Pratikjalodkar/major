import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token"); // Check if the user is logged in
    return token ? children : <Navigate to="/login" />; // Redirect to login if not authenticated
};

export default PrivateRoute;
