import { AlignJustify } from "lucide-react";
import { useState } from "react";
import Logo from "../logo/Logo";
import Nav from "../nav/Nav";

interface MobileNavProps {
    links: { name: string; path: string }[];
}

const MobileNav: React.FC<MobileNavProps> = ({ links }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="container mx-auto">
            {/* ✅ Open Mobile Menu Button */}
            <div className="cursor-pointer" onClick={() => setOpen(true)}>
                <AlignJustify />
            </div>

            {open && (
                <div className="fixed inset-0 bg-white dark:bg-accent z-50 flex flex-col items-center justify-center p-8">
                    {/* ✅ Close Button */}
                    <button
                        className="absolute top-5 right-5 text-lg"
                        onClick={() => setOpen(false)}
                    >
                        ✕
                    </button>

                    <Logo />
                    <Nav
                        links={links}
                        containerStyles="flex flex-col items-center gap-y-6"
                        linkStyles="text-[min(4.5vw,1rem)] leading-normal"
                        onClick={() => setOpen(false)}
                    />
                </div>
            )}
        </div>
    );
};

export default MobileNav;
