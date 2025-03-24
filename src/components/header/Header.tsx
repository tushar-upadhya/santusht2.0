import { adminLinks, userLinks } from "@/lib/links/NavLinks";
import LogoutButton from "@/LogoutButton";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../ui/bread-crumbs/Breadcrumbs";
import HeaderOne from "./header-one/HeaderOne";
import Logo from "./logo/Logo";
import MobileNav from "./mobile-nav/MobileNav";
import Nav from "./nav/Nav";

const throttle = (func: (...args: any[]) => void, limit: number) => {
    let inThrottle: boolean;
    return (...args: any[]) => {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};

const Header: React.FC = () => {
    const [header, setHeader] = useState<boolean>(false);
    const location = useLocation();
    const isAuthenticated = useSelector(
        (state: any) => state.auth.isAuthenticated
    );

    const isAdminRoute = useMemo(
        () => location.pathname.startsWith("/admin"),
        [location.pathname]
    );

    const handleScroll = useCallback(() => {
        setHeader(window.scrollY > 50);
    }, []);

    useEffect(() => {
        const throttledHandleScroll = throttle(handleScroll, 100);
        window.addEventListener("scroll", throttledHandleScroll);
        return () => {
            window.removeEventListener("scroll", throttledHandleScroll);
        };
    }, [handleScroll]);

    const baseClasses =
        "sticky top-0 z-30 transition-colors duration-300 ease-in-out";
    const scrollClasses = header
        ? "py-4 bg-white dark:bg-gray-900"
        : "py-6 bg-[#fef9f5] dark:bg-transparent";
    const routeClasses =
        location.pathname !== "/" && !header ? "bg-white dark:bg-gray-900" : "";

    return (
        <header className={`${baseClasses} ${scrollClasses} ${routeClasses}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-4">
                    <HeaderOne />
                </div>

                <div className="flex items-center justify-between">
                    <Logo
                        title="SANTUSHT"
                        description="All India Institute Of Medical Sciences, Ansari Nagar New Delhi"
                    />
                    <div className="flex items-center gap-x-4">
                        <Nav
                            links={isAdminRoute ? adminLinks : userLinks}
                            containerStyles="hidden xl:flex gap-x-8 items-center"
                            linkStyles="relative hover:text-primary transition-colors duration-200"
                            underlineStyles="absolute left-0 top-full h-[2px] bg-primary w-full"
                        />
                        {isAuthenticated && <LogoutButton />}
                        <div className="xl:hidden">
                            <MobileNav
                                links={isAdminRoute ? adminLinks : userLinks}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center mt-4">
                <Breadcrumbs />
            </div>
        </header>
    );
};

export default Header;
