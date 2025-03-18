import { logout } from "@/redux/features/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AuthChecker({
    children,
}: {
    children: React.ReactNode;
}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        const expiry = sessionStorage.getItem("tokenExpiry");

        if (!token || (expiry && new Date().getTime() > Number(expiry))) {
            console.log("Session expired! Logging out...");
            dispatch(logout());
            navigate("/login");
        }
    }, [dispatch, navigate]);

    return <>{children}</>;
}
