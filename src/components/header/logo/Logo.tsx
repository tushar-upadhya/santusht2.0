import React from "react";
import { Link } from "react-router-dom";
import logoDark from "../../../../src/assets/aiimslogo_green.svg";

interface LogoProps {
    title?: string;
    description?: string;
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ title, description, className }) => {
    return (
        <Link to="/" className={`flex items-center gap-2 ${className}`}>
            <img
                src={logoDark}
                alt="logo"
                className="h-auto w-auto ml-4 max-w-[40px] sm:max-w-[40px] md:max-w-[40px]"
            />
            {(title || description) && (
                <div className="hidden sm:block text-left ml-2">
                    {title && (
                        <p className="text-lg font-semibold dark:text-gray-300">
                            {title}
                        </p>
                    )}
                    {description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {description}
                        </p>
                    )}
                </div>
            )}
        </Link>
    );
};

export default Logo;
