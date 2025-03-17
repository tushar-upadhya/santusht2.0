import contactImage from "@/assets/contact.svg";
import ContactForm from "@/components/forms/contact-form/ContactForm";
import { Button } from "@/components/ui/button";
import React from "react";
import { Toaster, toast } from "sonner";

const ContactPage: React.FC = () => {
    const handleCopy = (phoneNumber: string) => {
        navigator.clipboard.writeText(phoneNumber);
        toast.success(`Copied: ${phoneNumber}`, {
            description: "Phone number copied to clipboard",
        });
    };

    const handleMail = (email: string) => {
        window.location.href = `mailto:${email}`;
    };

    return (
        <section className="py-12">
            <div className="container mx-auto">
                <Toaster position="bottom-right" />
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:h-[480px] mb-6 xl:mb-24">
                    <div className="flex flex-col justify-center text-center xl:text-left">
                        {/* Image */}
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                            <div className="w-[90%] sm:w-[70%] md:w-[60%] xl:w-[50%] flex justify-center lg:justify-start">
                                <img
                                    src={contactImage}
                                    alt="About Santusht"
                                    className="w-full h-auto rounded-lg"
                                />
                            </div>

                            {/* Greeting Text */}
                            <div className="flex justify-center lg:justify-start items-center mb-4 mt-6 text-[min(5vw,1rem)] leading-relaxed gap-x-4 text-primary">
                                Say Hello 👋
                            </div>

                            {/* Heading Text */}
                            <h1 className="text-[min(4vw,1rem)] md:text-[min(4vw,1rem)] leading-relaxed font-bold max-w-lg mb-4 sm:mb-8 capitalize text-center md:text-center lg:text-left">
                                For personalized assistance, our Contact Us
                                section ensures swift communication. Reach out
                                to SANTUSHT anytime for immediate support or
                                information. Our dedicated team is ready to
                                address your concerns, providing the help you
                                need promptly. Your well-being is our top
                                priority, and we&apos;re here for you.
                            </h1>
                        </div>

                        {/* Contact Info (Phone Numbers) */}
                        <div className="flex items-center gap-x-4 sm:gap-x-8 justify-center xl:justify-start">
                            <div className="text-sm sm:text-base">
                                <Button
                                    variant={"link"}
                                    onClick={() => handleCopy("011-26588500")}
                                    className="font-medium cursor-pointer hover:bg-green-200 text-slate-700 rounded-md text-[min(4vw,1rem)] leading-relaxed dark:border-orange-500 dark:text-gray-300"
                                >
                                    011-26588500
                                </Button>
                                {" | "}
                                <Button
                                    variant={"link"}
                                    onClick={() => handleCopy("011-26588900")}
                                    className="hover:bg-green-200 text-slate-700 font-medium rounded-md text-[min(4vw,1rem)] leading-relaxed cursor-pointer dark:border-orange-500 dark:text-gray-300"
                                >
                                    011-26588900
                                </Button>
                            </div>
                        </div>

                        {/* Email Info */}
                        <div className="flex items-center gap-x-1 sm:gap-x-1 justify-center xl:justify-start mt-4">
                            <Button
                                variant={"link"}
                                onClick={() =>
                                    handleMail("contact@santusht.com")
                                }
                                className="hover:bg-green-200 text-slate-700 font-medium rounded-md text-[min(4vw,1rem)] cursor-pointer leading-relaxed dark:border-orange-500 dark:text-gray-300"
                            >
                                contact@santusht.com
                            </Button>
                            |
                            <Button
                                variant={"link"}
                                onClick={() =>
                                    handleMail("contact@santusht.com")
                                }
                                className="hover:bg-green-200 text-slate-700 font-medium rounded-md text-[min(4vw,1rem)] cursor-pointer leading-relaxed dark:border-orange-500 dark:text-gray-300"
                            >
                                contact@santusht.com
                            </Button>
                        </div>
                    </div>

                    {/* Right side content (Contact Form) */}
                    <div className="xl:ml-12 mt-8 xl:mt-52">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactPage;
