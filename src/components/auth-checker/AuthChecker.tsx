import { logout } from "@/redux/features/authSlice";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export default function AuthChecker({
    children,
}: {
    children: React.ReactNode;
}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        // console.log("Current Path:", location.pathname);
        // console.log("Is Authenticated:", isAuthenticated);
        // console.log("Token Exists:", Boolean(token));

        const allowedWithoutAuth = ["/login", "/contact", "/"];

        if (!token && !allowedWithoutAuth.includes(location.pathname)) {
            dispatch(logout());
            navigate("/login", { replace: true });
            return;
        }

        if (isAuthenticated && location.pathname === "/") {
            // console.log("Logging out because user is on home page after login");
            dispatch(logout());
            navigate("/login", { replace: true });
        }
    }, [isAuthenticated, dispatch, navigate, location.pathname]);

    return <>{children}</>;
}
