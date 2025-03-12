import { useAuth } from "@/components/auth/AuthProvider";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
    allowedRoles,
    children,
}: {
    allowedRoles: string[];
    children: ReactNode;
}) => {
    const { role } = useAuth();

    if (!role || !allowedRoles.includes(role)) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
