import { ArrowRightIcon, MailIcon, MessageSquare, User } from "lucide-react";
import React from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";

const ContactForm: React.FC = () => {
    return (
        <form className="flex flex-col gap-y-4 ">
            {/* input */}

            <div className="relative flex items-center">
                <Input
                    type="name"
                    id="name"
                    placeholder="Name"
                    className="flex min-h-[60px] w-full rounded-[30px]  dark:border-primary/50 border border-input bg-background px-8 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <User className="absolute right-6" size={20} />
            </div>

            {/* input */}

            <div className="relative flex items-center">
                <Input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="flex min-h-[60px] w-full dark:border-primary/50 rounded-[30px] border border-input bg-background px-8 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <MailIcon className="absolute right-6" size={20} />
            </div>

            {/* textarea */}

            <div className="relative flex items-center">
                <Textarea
                    placeholder="Type Your Message Here."
                    className="flex min-h-[180px] w-full dark:border-primary/50 rounded-[30px] border border-input bg-background px-8 py-4 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <MessageSquare className="absolute top-4 right-6" size={20} />
            </div>
            <Button
                className="flex text-white font-medium  bg-[#FA7275] hover:bg-[#FA7275]/40hover:animate-none cursor-pointer items-center gap-x-1 max-w-[166px] "
                variant={"secondary"}
            >
                Send Message
                <ArrowRightIcon size={20} />
            </Button>
        </form>
    );
};

export default ContactForm;
