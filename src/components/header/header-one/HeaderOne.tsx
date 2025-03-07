import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../../ui/button";

const HeaderOne: React.FC = () => {
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const dateOptions: Intl.DateTimeFormatOptions = {
                weekday: "long",
                day: "2-digit",
                month: "short",
                year: "numeric",
            };
            const timeOptions: Intl.DateTimeFormatOptions = {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            };

            const formattedDate = now.toLocaleDateString("en-US", dateOptions);
            const formattedTime = now.toLocaleTimeString("en-US", timeOptions);
            setCurrentTime(`${formattedDate}, ${formattedTime}`);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleCopy = () => {
        const phoneNumber = "011-26588500";
        navigator.clipboard.writeText(phoneNumber);
        toast(`${phoneNumber} has been copied to your clipboard.`);
    };

    return (
        <header className="flex flex-wrap justify-between items-center px-4 md:px-6 dark:bg-transparent py-2">
            {/* Left side: Date, Time, Day */}
            <div className="text-[min(4vw,1rem)] leading-relaxed text-gray-700 dark:text-gray-300">
                {currentTime}
            </div>

            {/* Right side: Call Button with Copy Functionality */}
            <Button
                onClick={handleCopy}
                className="px-4 mt-2 sm:px-4 py-2 text-primary font-medium rounded-md text-[min(4vw,1rem)] leading-relaxed dark:text-gray-300"
                variant="link"
            >
                Call us now : 011-26588500
            </Button>
        </header>
    );
};

export default HeaderOne;
