import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
} from "@/components/ui/dialog";
import { logout } from "@/redux/features/authSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function LogoutButton() {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [userFullname, setUserFullname] = useState("your account");

    const fullname = useSelector((state: any) => state.auth.fullname);

    useEffect(() => {
        console.log("Redux Fullname:", fullname);
        if (fullname) {
            setUserFullname(fullname);
        }
    }, [fullname]);

    const handleLogout = () => {
        dispatch(logout());
        setOpen(false);
    };

    return (
        <>
            {/* Logout Button */}
            <Button
                onClick={() => setOpen(true)}
                className="cursor-pointer bg-[#FA7275] hover:bg-[#FA7275]/80 text-white transition-all duration-300"
            >
                Logout
            </Button>

            {/* Confirmation Modal */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="bg-white">
                    <DialogHeader>
                        <h2 className="text-lg font-semibold">
                            {userFullname}, are you sure?
                        </h2>
                        <p className="text-sm text-gray-500">
                            Do you really want to log out?
                        </p>
                    </DialogHeader>
                    <DialogFooter className="flex gap-4 justify-end">
                        <Button
                            onClick={() => setOpen(false)}
                            variant="outline"
                            className="border-gray-300 text-gray-700 hover:bg-gray-100"
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
