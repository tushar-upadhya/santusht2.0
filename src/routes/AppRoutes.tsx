import ErrorBoundary from "@/components/ErrorBoundary";
import Header from "@/components/header/Header";
import Index from "@/pages/admin";
import ContactRequestPage from "@/pages/admin/contact-request/ContactRequestPage";
import FeedbackPage from "@/pages/admin/feedback/FeedbackPage";
import QRPage from "@/pages/admin/qr/QrPage";
import UserManagementPage from "@/pages/admin/user-management/UserManagementPage";
import LoginPage from "@/pages/auth/login/LoginPage";
import ContactPage from "@/pages/contact/ContactPage";
import HomePage from "@/pages/home/HomePage";
import LevelOnePage from "@/pages/level-one/LevelOnePage";
import LevelThreePage from "@/pages/level-three/LevelThreePage";
import LevelTwoPage from "@/pages/level-two/LevelTwoPage";
import GrievancePage from "@/pages/patient-grievance/GrievancePage";
import SuperAdminPage from "@/pages/super-admin/Index";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
    const { isAuthenticated, role } = useSelector(
        (state: RootState) => state.auth
    );

    const getRedirectPath = () => {
        switch (role) {
            case "ADMIN":
                return "/admin";
            case "SUPER_ADMIN":
                return "/super-admin";
            case "LEVEL_ONE":
                return "/level-one";
            case "LEVEL_TWO":
                return "/level-two";
            case "LEVEL_THREE":
                return "/level-three";
            default:
                return "/";
        }
    };

    const adminRoutes = [
        { path: "/admin", element: <Index /> },
        { path: "/admin/user-management", element: <UserManagementPage /> },
        { path: "/admin/qr", element: <QRPage /> },
        { path: "/admin/contact-request", element: <ContactRequestPage /> },
        { path: "/admin/feedback", element: <FeedbackPage /> },
    ];

    const superAdminRoutes = [
        { path: "/super-admin", element: <SuperAdminPage /> },
    ];
    const levelTwoRoutes = [{ path: "/level-two", element: <LevelTwoPage /> }];
    const levelThreeRoutes = [
        { path: "/level-three", element: <LevelThreePage /> },
    ];

    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/login"
                    element={
                        isAuthenticated ? (
                            <Navigate to={getRedirectPath()} replace />
                        ) : (
                            <LoginPage />
                        )
                    }
                />
                <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
                    {adminRoutes.map(({ path, element }) => (
                        <Route
                            key={path}
                            path={path}
                            element={<ErrorBoundary>{element}</ErrorBoundary>}
                        />
                    ))}
                </Route>
                <Route
                    element={<ProtectedRoute allowedRoles={["SUPER_ADMIN"]} />}
                >
                    {superAdminRoutes.map(({ path, element }) => (
                        <Route
                            key={path}
                            path={path}
                            element={<ErrorBoundary>{element}</ErrorBoundary>}
                        />
                    ))}
                </Route>
                <Route
                    element={<ProtectedRoute allowedRoles={["LEVEL_TWO"]} />}
                >
                    {levelTwoRoutes.map(({ path, element }) => (
                        <Route
                            key={path}
                            path={path}
                            element={<ErrorBoundary>{element}</ErrorBoundary>}
                        />
                    ))}
                </Route>
                <Route
                    element={<ProtectedRoute allowedRoles={["LEVEL_THREE"]} />}
                >
                    {levelThreeRoutes.map(({ path, element }) => (
                        <Route
                            key={path}
                            path={path}
                            element={<ErrorBoundary>{element}</ErrorBoundary>}
                        />
                    ))}
                </Route>
                <Route path="/contact" element={<ContactPage />} />
                <Route
                    path="/grievance-page/:userId"
                    element={<GrievancePage />}
                />
                <Route path="/level1" element={<LevelOnePage />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    );
};

export default AppRoutes;
