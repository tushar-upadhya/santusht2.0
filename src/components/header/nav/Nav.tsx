import { NavLink } from "react-router-dom";

interface NavProps {
    links: { name: string; path: string }[];
    containerStyles?: string;
    linkStyles?: string;
    underlineStyles?: string;
    onClick?: () => void;
}

const Nav = ({
    links = [],
    containerStyles = "",
    linkStyles = "",
    underlineStyles = "",
    onClick,
}: NavProps) => {
    if (!links || links.length === 0) {
        return null;
    }

    return (
        <nav className={`${containerStyles} flex gap-6`}>
            {links.map((link) => (
                <NavLink
                    to={link.path}
                    key={link.path}
                    className={({ isActive }) =>
                        `relative text-gray-600 dark:text-gray-300 hover:text-primary transition-all duration-300
                        ${linkStyles} ${
                            isActive
                                ? "text-primary font-semibold after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-primary after:rounded-full after:scale-100 after:transition-all after:duration-300"
                                : "text-gray-600 dark:text-gray-300 after:scale-0"
                        }`
                    }
                    onClick={onClick}
                >
                    {link.name}
                </NavLink>
            ))}
        </nav>
    );
};

export default Nav;
