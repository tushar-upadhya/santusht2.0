import authImage from "@/public/aiimshospital1.svg";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <section className="py-8 md:py-12 lg:py-16">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 xl:h-[480px] mb-6 xl:mb-24">
                    {/* Left Side - Image & Text */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                        <div className="w-[90%] sm:w-[70%] md:w-[60%] xl:w-[50%] flex justify-center lg:justify-start">
                            <img
                                src={authImage}
                                alt="About Santusht"
                                className="w-full h-auto rounded-lg"
                                // priority
                            />
                        </div>

                        {/* Greeting Text */}
                        <div className="flex justify-center lg:justify-start items-center mb-4 mt-6 text-[min(5vw,1rem)] leading-relaxed gap-x-4 text-primary">
                            Say Hello 👋
                        </div>

                        {/* Heading Text - Responsive Alignment */}
                        <h1 className="text-[min(4vw,1rem)] md:text-[min(4vw,1rem)] leading-relaxed font-bold max-w-lg mb-4 sm:mb-8 capitalize text-center md:text-center lg:text-left">
                            For personalized assistance, our Contact Us section
                            ensures swift communication. Reach out to SANTUSHT
                            anytime for immediate support or information. Our
                            dedicated team is ready to address your concerns,
                            providing the help you need promptly. Your
                            well-being is our top priority, and we&apos;re here
                            for you.
                        </h1>
                    </div>

                    {/* Right Side - Contact Form */}
                    <div className="w-full xl:ml-12 mt-8 xl:mt-0 flex justify-center lg:justify-start">
                        {children}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AuthLayout;
