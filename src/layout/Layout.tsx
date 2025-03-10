import { Outlet } from "react-router-dom";

export const AdminLayout = () => {
    return (
        <main className="container mx-auto">
            <Outlet />
        </main>
    );
};
