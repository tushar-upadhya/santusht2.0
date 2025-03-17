import { NavLink } from "../types/navtype";

export const userLinks: NavLink[] = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
    { name: "Login", path: "/login" },
];

// Admin Panel Links
export const adminLinks: NavLink[] = [
    { name: "Dashboard", path: "/admin" },
    { name: "Users", path: "/admin/user-management" },
    { name: "QR", path: "/admin/qr" },
    { name: "Contacts", path: "/admin/contact-request" },
    { name: "Feedback", path: "/admin/feedback" },
];
// super Admin Panel Links
export const SuperAdminLinks: NavLink[] = [
    { name: "Dashboard", path: "/super-admin" },
    { name: "User Management", path: "/super-admin/user-management" },
    { name: "QR Codes", path: "/super-admin/qr" },
    { name: "Reports", path: "/super-admin/reports" },
    { name: "Logout", path: "/logout" },
];

export const levelOneLinks: NavLink[] = [
    { name: "Dashboard", path: "/level-one" },
];

export const levelTwoLinks: NavLink[] = [
    { name: "Dashboard", path: "/level-one" },
];
