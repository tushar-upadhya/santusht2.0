import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { logout } from "./redux/features/authSlice";

const LogoutButton = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return <Button onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;
