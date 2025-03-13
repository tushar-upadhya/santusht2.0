import Header from "@/components/header/Header";
import Index from "@/pages/admin";
import LoginPage from "@/pages/auth/login/LoginPage";
import HomePage from "@/pages/home/HomePage";
import SuperAdminPage from "@/pages/super-admin/Index";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />

                {/* Admin Routes */}
                <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
                    <Route path="/admin" element={<Index />} />
                </Route>

                {/* Super Admin Routes */}
                <Route
                    element={<ProtectedRoute allowedRoles={["SUPER_ADMIN"]} />}
                >
                    <Route path="/super-admin" element={<SuperAdminPage />} />
                </Route>

                {/* Redirect all unknown routes to Home */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    );
};

export default AppRoutes;
