import { logout } from "@/redux/features/authSlice";
import { useDispatch } from "react-redux";

export default function LogoutButton() {
    const dispatch = useDispatch();

    return (
        <button
            onClick={() => dispatch(logout())}
            className="bg-red-500 text-white px-4 py-2 rounded"
        >
            Logout
        </button>
    );
}
