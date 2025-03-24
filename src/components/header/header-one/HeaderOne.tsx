import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../../ui/button";

const PHONE_NUMBER = "011-26588500";
const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
};
const TIME_OPTIONS: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
};

const HeaderOne: React.FC = () => {
    const [currentTime, setCurrentTime] = useState("");

    const updateTime = useCallback(() => {
        const now = new Date();
        const formattedDate = now.toLocaleDateString("en-US", DATE_OPTIONS);
        const formattedTime = now.toLocaleTimeString("en-US", TIME_OPTIONS);
        setCurrentTime(`${formattedDate}, ${formattedTime}`);
    }, []);

    useEffect(() => {
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, [updateTime]);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(PHONE_NUMBER);
        toast(`${PHONE_NUMBER} has been copied to your clipboard.`);
    }, []);

    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-6 lg:px-8 py-3 border-b border-gray-200 dark:border-gray-700">
            {/* Date and Time */}
            <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium mb-2 sm:mb-0">
                {currentTime}
            </span>

            {/* Call Button */}
            <Button
                onClick={handleCopy}
                variant="link"
                className="px-4 py-1 cursor-pointer text-primary hover:text-primary/80 dark:text-gray-200 dark:hover:text-primary/90 font-medium rounded-md text-sm sm:text-base transition-colors"
            >
                Call us now: {PHONE_NUMBER}
            </Button>
        </div>
    );
};

export default React.memo(HeaderOne);
