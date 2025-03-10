import { NavLink } from "../types/navtype";

export const userLinks: NavLink[] = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
    { name: "Login", path: "/login" },
];

// Admin Panel Links
export const adminLinks: NavLink[] = [
    { name: "Dashboard", path: "/admin" },
    { name: "User Management", path: "/admin/user-management" },
    { name: "QR Codes", path: "/admin/qr" },
    { name: "Contact Request", path: "/admin/contact-request" },
    { name: "Feedback", path: "/admin/feedback" },
    { name: "Logout", path: "/logout" },
];
// super Admin Panel Links
export const SuperAdminLinks: NavLink[] = [
    { name: "Dashboard", path: "/super-admin" },
    { name: "User Management", path: "/super-admin/user-management" },
    { name: "QR Codes", path: "/super-admin/qr" },
    { name: "Reports", path: "/super-admin/reports" },
    { name: "Logout", path: "/logout" },
];
