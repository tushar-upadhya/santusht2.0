import authImage from "@/assets/aiimshospital1.svg";
import AuthForm from "@/components/forms/auth-form/AuthForm";
import React from "react";

const LoginPage: React.FC = () => {
    return (
        <section className="py-12 lg:py-16">
            <div className="container mx-auto px-6 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
                    <div className="flex flex-col items-center lg:items-start text-center capitalize text-slate-700 lg:text-left">
                        <div className="w-[80%] sm:w-[60%] md:w-[50%] lg:w-[80%] xl:w-[60%] flex justify-center lg:justify-start">
                            <img
                                src={authImage}
                                alt="Santusht Hospital"
                                className="w-full h-auto rounded-lg"
                            />
                        </div>

                        {/* Greeting Text */}
                        <p className=" text-[min(6vw,1.5rem)] font-semibold mt-6 flex items-center gap-2">
                            Say Hello 👋
                        </p>

                        {/* Heading Text */}
                        <h1 className="text-[min(4vw,1rem)] font-semibold leading-relaxed max-w-lg mt-2">
                            For personalized assistance, our Contact Us section
                            ensures swift communication. Reach out to SANTUSHT
                            anytime for immediate support or information. Our
                            dedicated team is ready to address your concerns,
                            providing the help you need promptly. Your
                            well-being is our top priority, and we&apos;re here
                            for you.
                        </h1>
                    </div>

                    <AuthForm />
                </div>
            </div>
        </section>
    );
};

export default LoginPage;
