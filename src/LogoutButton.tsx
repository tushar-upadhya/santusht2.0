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
        console.log("Logout button clicked!");
        dispatch(logout());

        setOpen(false);
    };

    useEffect(() => {
        if (!isAuthenticated) {
            console.log("User logged out. Redirecting to login page...");
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                className="cursor-pointer bg-[#FA7275] hover:bg-[#FA7275]/80 text-white transition-all duration-300"
            >
                Logout
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="bg-white">
                    <DialogHeader>
                        <h2 className="  capitalize text-[min(4vw,1.2rem)] text-slate-800 font-medium">
                            {fullname || "User"}
                        </h2>
                        <p className="text-sm text-gray-500">
                            Do you really want to log out?
                        </p>
                    </DialogHeader>
                    <DialogFooter className="flex gap-4 justify-end">
                        <Button
                            onClick={() => setOpen(false)}
                            variant="outline"
                            className="border-gray-300 text-slate-700 hover:bg-gray-100"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleLogout}
                            className="bg-[#FA7275] hover:bg-[#FA7275]/80 text-white"
                        >
                            Logout
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
