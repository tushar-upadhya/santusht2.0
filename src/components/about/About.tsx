import React from "react";
import aboutImage from "../../../src/assets/reception.svg";
import { Separator } from "../ui/separator";

const About: React.FC = () => {
    return (
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Heading */}
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 text-green-500">
                    About Santusht
                </p>
                <Separator className="bg-gray-300 mx-auto mb-6 w-20 sm:w-24 h-[2px]" />

                {/* Intro Paragraph */}
                <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 text-left max-w-3xl mx-auto mb-10 sm:mb-12 leading-relaxed">
                    SANTUSHT empowers you to voice your concerns and aids in
                    resolving grievances promptly. It is accessible 24/7 as we
                    prioritize your well-being. Share your feedback seamlessly
                    to help us enhance your healthcare experience. Your input
                    shapes our commitment to compassionate care, ensuring
                    satisfaction and trust in every step of your journey.
                </p>

                {/* Main Content */}
                <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
                    {/* Image Section */}
                    <div className="w-full md:w-1/2 flex justify-center">
                        <img
                            src={aboutImage}
                            alt="About Santusht"
                            className="w-full max-w-md h-auto "
                        />
                    </div>

                    {/* Content Section */}
                    <div className="w-full md:w-1/2 space-y-4 sm:space-y-6">
                        {/* Subheading */}
                        <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 text-left leading-tight">
                            Elevating Patient Care with Compassion,
                            Accessibility and Continuous Improvement
                        </p>

                        {/* Description */}
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 text-left leading-relaxed">
                            Your voice matters. Prompt resolutions 24/7 support.
                            Seamless feedback shapes compassionate care. Your
                            satisfaction, our commitment.
                        </p>

                        {/* List */}
                        <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 text-left leading-relaxed">
                            <li>
                                <span className="font-semibold text-gray-800 dark:text-gray-200">
                                    Efficient Grievance Resolution:
                                </span>{" "}
                                Ensuring swift and satisfactory solutions for
                                patients.
                            </li>
                            <li>
                                <span className="font-semibold text-gray-800 dark:text-gray-200">
                                    Seamless Feedback Collection:
                                </span>{" "}
                                Enhancing our services for optimal patient
                                satisfaction.
                            </li>
                        </ul>

                        {/* Closing Paragraph */}
                        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium text-left leading-relaxed">
                            SANTUSHT, our patient grievance and feedback portal,
                            offers round-the-clock support, efficiently
                            resolving grievances, and valuing patient feedback
                            for continuous improvement. Empowering your
                            healthcare journey with prompt, compassionate
                            service, we prioritize satisfaction and trust.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
