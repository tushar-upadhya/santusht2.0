import { useNavigate } from "react-router-dom";
import { useAuth } from "./components/auth/AuthProvider";

const LogoutButton = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2"
        >
            Logout
        </button>
    );
};

export default LogoutButton;
