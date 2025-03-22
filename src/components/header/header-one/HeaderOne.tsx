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
        <header className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 lg:px-8 py-3 bg-transparent dark:bg-transparent border-b border-gray-200 dark:border-gray-700">
            {/* Left side: Date, Time, Day */}
            <div className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium mb-2 sm:mb-0">
                {currentTime}
            </div>

            {/* Right side: Call Button with Copy Functionality */}
            <Button
                onClick={handleCopy}
                className="px-4 py-2 text-primary hover:text-primary-dark cursor-pointer dark:text-gray-200 dark:hover:text-primary font-medium rounded-full text-sm sm:text-base transition-colors"
                variant="link"
            >
                Call us now: 011-26588500
            </Button>
        </header>
    );
};

export default HeaderOne;
