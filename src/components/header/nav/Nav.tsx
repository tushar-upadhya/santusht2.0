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
        <nav className={containerStyles}>
            {links.map((link) => (
                <NavLink
                    to={link.path}
                    key={link.path}
                    className={({ isActive }) =>
                        `capitalize ${linkStyles} ${
                            isActive ? underlineStyles : ""
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
