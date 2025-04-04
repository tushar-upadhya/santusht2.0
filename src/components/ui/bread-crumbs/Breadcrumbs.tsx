import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { logout } from "@/redux/features/authSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../breadcrumb";

export default function Breadcrumbs() {
    const location = useLocation();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const segments = location.pathname.split("/").filter(Boolean);

    interface RootState {
        auth: {
            user: {
                firstName?: string;
                lastName?: string;
                profileImage?: string;
            } | null;
        };
    }

    const user = useSelector((state: RootState) => state.auth.user);
    const firstName = user?.firstName || "";
    const lastName = user?.lastName || "";
    const profileImage = user?.profileImage || "";

    const avatarInitials = `${firstName?.charAt(0) || ""}${
        lastName?.charAt(0) || ""
    }`.toUpperCase();

    const handleLogout = () => {
        dispatch(logout());
        setOpen(false);
    };

    return (
        <div className="flex items-center space-x-3">
            {avatarInitials && (
                <Avatar
                    onClick={() => setOpen(true)}
                    className="cursor-pointer"
                >
                    <AvatarImage src={profileImage} alt="User Avatar" />
                    <AvatarFallback>{avatarInitials}</AvatarFallback>
                </Avatar>
            )}

            {/* Logout Confirmation Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Logout Confirmation</DialogTitle>
                    </DialogHeader>
                    <p>Are you sure you want to logout?</p>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleLogout}>
                            Logout
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Breadcrumb Navigation */}
            <Breadcrumb>
                <BreadcrumbList className="leading-4 capitalize">
                    {segments.map((segment, index) => {
                        const route = `/${segments
                            .slice(0, index + 1)
                            .join("/")}`;
                        const formattedSegment = segment.replace(/-/g, " ");

                        return (
                            <React.Fragment key={route}>
                                <BreadcrumbItem>
                                    {index === segments.length - 1 ? (
                                        <BreadcrumbPage className="font-medium uppercase dark:text-primary text-slate-800 ">
                                            {formattedSegment}
                                        </BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink asChild>
                                            <Link to={route}>
                                                {formattedSegment}
                                            </Link>
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                                {index < segments.length - 1 && (
                                    <BreadcrumbSeparator />
                                )}
                            </React.Fragment>
                        );
                    })}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}
