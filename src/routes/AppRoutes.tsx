import AuthChecker from "@/components/AuthChecker";
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
import SuperAdminPage from "@/pages/super-admin/Index";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import GrievancePage from "@/pages/patient-grievance/GrievancePage";

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

    // role based routes
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
    const levelOneRoutes = [{ path: "/level-one", element: <LevelOnePage /> }];
    const levelTwoRoutes = [{ path: "/level-two", element: <LevelTwoPage /> }];
    const levelThreeRoutes = [
        { path: "/level-three", element: <LevelThreePage /> },
    ];

    return (
        <AuthChecker>
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

                {/* Admin Routes */}
                <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
                    {adminRoutes.map(({ path, element }) => (
                        <Route key={path} path={path} element={element} />
                    ))}
                </Route>

                {/* Super Admin Routes */}
                <Route
                    element={<ProtectedRoute allowedRoles={["SUPER_ADMIN"]} />}
                >
                    {superAdminRoutes.map(({ path, element }) => (
                        <Route key={path} path={path} element={element} />
                    ))}
                </Route>

                {/* Level One Routes */}
                <Route
                    element={<ProtectedRoute allowedRoles={["LEVEL_ONE"]} />}
                >
                    {levelOneRoutes.map(({ path, element }) => (
                        <Route key={path} path={path} element={element} />
                    ))}
                </Route>

                {/* Level Two Routes */}
                <Route
                    element={<ProtectedRoute allowedRoles={["LEVEL_TWO"]} />}
                >
                    {levelTwoRoutes.map(({ path, element }) => (
                        <Route key={path} path={path} element={element} />
                    ))}
                </Route>

                {/* Level Three Routes */}
                <Route
                    element={<ProtectedRoute allowedRoles={["LEVEL_THREE"]} />}
                >
                    {levelThreeRoutes.map(({ path, element }) => (
                        <Route key={path} path={path} element={element} />
                    ))}
                </Route>

                {/* Public Routes */}
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/grievance" element={<GrievancePage />} />

                {/* Redirect unknown routes to Home */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </AuthChecker>
    );
};

export default AppRoutes;
