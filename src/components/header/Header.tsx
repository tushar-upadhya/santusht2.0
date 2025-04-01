import LogoutButton from "@/components/logout-button/LogoutButton";
import { adminLinks, userLinks } from "@/lib/links/NavLinks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../ui/bread-crumbs/Breadcrumbs";
import HeaderOne from "./header-one/HeaderOne";
import Logo from "./logo/Logo";
import MobileNav from "./mobile-nav/MobileNav";
import Nav from "./nav/Nav";

const throttle = (func: (...args: unknown[]) => void, limit: number) => {
    let inThrottle: boolean;
    return (...args: unknown[]) => {
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
        (state: { auth: { isAuthenticated: boolean } }) =>
            state.auth.isAuthenticated
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
                            // underlineStyles removed as it is not part of NavProps
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
