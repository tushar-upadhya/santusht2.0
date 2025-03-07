import { Navigate, Route, Routes } from "react-router-dom";
import Header from "../components/header/Header";
import Index from "../pages/admin";
import ContactRequestPage from "../pages/admin/contact-request/ContactRequestPage";
import FeedbackPage from "../pages/admin/feedback/FeedbackPage";
import QrPage from "../pages/admin/qr/QrPage";
import UserManagementPage from "../pages/admin/user-management/UserManagementPage";
import ContactPage from "../pages/contact/ContactPage";
import HomePage from "../pages/home/HomePage";
import { AdminLayout } from "../pages/layout/AdminLayout";
import LoginPage from "../pages/login/LoginPage";

export default function AppRoutes() {
    return (
        <>
            <Header />
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />

                {/* Admin Routes (Protected) */}
                <Route
                    path="/admin"
                    element={
                        <AdminLayout />
                        // </ProtectedRoute>
                    }
                >
                    <Route index element={<Index />} />
                    <Route
                        path="user-management"
                        element={<UserManagementPage />}
                    />
                    <Route path="qr" element={<QrPage />} />
                    <Route
                        path="contact-request"
                        element={<ContactRequestPage />}
                    />
                    <Route path="feedback" element={<FeedbackPage />} />
                </Route>

                {/* Redirect unknown routes to home */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    );
}
