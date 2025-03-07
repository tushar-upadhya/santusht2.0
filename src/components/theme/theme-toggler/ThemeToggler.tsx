import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "../../ui/button";
import { useTheme } from "../theme-provider/ThemeProvider";

const ThemeToggler = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button variant="outline" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? (
                <SunIcon className="h-[1.2rem] w-[1.2rem]" />
            ) : (
                <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
            )}
        </Button>
    );
};

export default ThemeToggler;
