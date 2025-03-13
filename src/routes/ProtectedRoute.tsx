import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouteProps = {
    allowedRoles: string[];
};

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
    const { role, isAuthenticated } = useSelector(
        (state: RootState) => state.auth
    );

    // Check if user is logged in and has an allowed role
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    if (!allowedRoles.includes(role || "")) return <Navigate to="/" replace />;

    return <Outlet />;
};

export default ProtectedRoute;
