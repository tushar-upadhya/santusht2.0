import { ArrowRightIcon, MailIcon, MessageSquare, User } from "lucide-react";
import React from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";

const ContactForm: React.FC = () => {
    return (
        <form className="flex flex-col gap-y-6 w-full max-w-md">
            {/* Name Input */}
            <div className="relative">
                <Input
                    type="text"
                    id="name"
                    placeholder="Name"
                    className="w-full min-h-[56px] rounded-full border border-gray-300 dark:border-primary/50 bg-white dark:bg-gray-800 px-6 py-3 text-base placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
                <User
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                    size={20}
                />
            </div>

            {/* Email Input */}
            <div className="relative">
                <Input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="w-full min-h-[56px] rounded-full border border-gray-300 dark:border-primary/50 bg-white dark:bg-gray-800 px-6 py-3 text-base placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
                <MailIcon
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                    size={20}
                />
            </div>

            {/* Message Textarea */}
            <div className="relative">
                <Textarea
                    placeholder="Type Your Message Here"
                    className="w-full min-h-[160px] rounded-3xl border border-gray-300 dark:border-primary/50 bg-white dark:bg-gray-800 px-6 py-4 text-base placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-y"
                />
                <MessageSquare
                    className="absolute right-4 top-4 text-gray-500 dark:text-gray-400"
                    size={20}
                />
            </div>

            {/* Submit Button */}
            <Button
                className="flex items-center justify-center gap-x-2 max-w-[180px] cursor-pointer bg-[#FA7275] hover:bg-[#FA7275]/80 text-white font-semibold rounded-full px-6 py-3 transition-colors"
                variant="secondary"
            >
                Send Message
                <ArrowRightIcon size={20} />
            </Button>
        </form>
    );
};

export default ContactForm;
