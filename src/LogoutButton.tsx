import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
} from "@/components/ui/dialog";
import { logout } from "@/redux/features/authSlice";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const { fullname, isAuthenticated } = useSelector(
        (state: RootState) => state.auth
    );

    useEffect(() => {
        console.log("Auth State Updated:", { fullname, isAuthenticated });
    }, [fullname, isAuthenticated]);

    const handleLogout = () => {
        dispatch(logout());
        setOpen(false);
    };

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    return (
        <>
            {/* Logout Trigger Button */}
            <Button
                onClick={() => setOpen(true)}
                className="rounded-full px-4 py-2 sm:px-6 sm:py-3 bg-[#FA7275] hover:bg-[#FA7275]/80 text-white text-sm sm:text-base font-medium transition-colors duration-300"
            >
                Logout
            </Button>

            {/* Logout Confirmation Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="w-full max-w-sm sm:max-w-md p-6 bg-white rounded-lg shadow-lg">
                    <DialogHeader>
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 capitalize">
                            {fullname || "User"}
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 mt-1">
                            Do you really want to log out?
                        </p>
                    </DialogHeader>
                    <DialogFooter className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end">
                        <Button
                            onClick={() => setOpen(false)}
                            variant="outline"
                            className="w-full sm:w-auto px-4 py-2 rounded-full border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-800 text-sm sm:text-base transition-colors"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleLogout}
                            className="w-full sm:w-auto px-4 py-2 rounded-full bg-[#FA7275] hover:bg-[#FA7275]/80 text-white text-sm sm:text-base font-medium transition-colors"
                        >
                            Logout
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
