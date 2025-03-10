import React from "react";
import aboutImage from "../../../src/assets/reception.svg";
import { Separator } from "../ui/separator";

const About: React.FC = () => {
    return (
        <section className="py-12">
            <div className="container mx-auto text-center px-4">
                <p className="text-[min(6vw,1.5rem)] font-bold text-center mb-6 dark:text-gray-300">
                    About Santusht
                </p>
                <Separator className="bg-gray-300 dark:bg-gray-700 mx-auto -mt-4 mb-4 w-24 h-[2px]" />
                <p className="text-left text-[min(4vw,1rem)] leading-relaxed capitalize text-muted-foreground mb-10 dark:text-gray-300">
                    SANTUSHT empowers you to voice your concerns and aids in
                    resolving grievances promptly. It is accessible 24/7 as we
                    prioritize your well-being. Share your feedback seamlessly
                    to help us enhance your healthcare experience. Your input
                    shapes our commitment to compassionate care, ensuring
                    satisfaction and trust in every step of your journey.
                </p>

                <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Image Section */}
                    <div className="w-full md:w-1/2 flex justify-center">
                        <img
                            src={aboutImage}
                            alt="About Santusht"
                            className="max-w-full h-auto rounded-lg"
                        />
                    </div>

                    {/* Content Section */}
                    <div className="w-full md:w-1/2 space-y-4">
                        <p className="text-[min(4.5vw,1rem)] leading-relaxed font-bold text-left text-gray-800 dark:text-gray-300 capitalize">
                            Elevating Patient Care with Compassion,
                            Accessibility and Continuous Improvement
                        </p>
                        <p className="text-gray-600 font-thin text-[min(4vw,1rem)] leading-relaxed text-left mb-8 dark:text-gray-300">
                            Your voice matters. Prompt resolutions 24/7 support.
                            Seamless feedback shapes compassionate care. Your
                            satisfaction, our commitment.
                        </p>

                        <ul className="list-disc pl-5 space-y-2 text-left text-gray-700 dark:text-gray-300 text-[min(4.5vw,1rem)] leading-normal">
                            <li>
                                <span className="font-semibold text-gray-800 dark:text-gray-300 ">
                                    Efficient Grievance Resolution:
                                </span>{" "}
                                Ensuring swift and satisfactory solutions for
                                patients.
                            </li>
                            <li>
                                <span className="font-semibold text-gray-800 dark:text-gray-300 ">
                                    Seamless Feedback Collection:
                                </span>{" "}
                                Enhancing our services for optimal patient
                                satisfaction.
                            </li>
                        </ul>

                        <p className="text-gray-700 font-medium capitalize text-left dark:text-gray-300 text-[min(4.5vw,1rem)] leading-relaxed">
                            SANTUSHT our patient grievance and feedback portal,
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
