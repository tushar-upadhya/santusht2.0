import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

interface Testimonial {
    id: number;
    name: string;
    role: string;
    feedback: string;
    image: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Kannu Priya",
        role: "Local Guide",
        feedback:
            "U will get best possible treatment in AIIMS DELHI ...FOR general medicine , gynec nd so on do visit new rajkumari nd for cancer ,neuro nd cardio, eye have individual hospital itself in the same ground for more info ask me in comment.",
        image: "/aiimshospital.svg",
    },
    {
        id: 2,
        name: "Md. Sajid Hussain",
        role: "Patient",
        feedback:
            "Best of Best hospital in India. Aiims Hospital every facilities available here cleaned every area and .best doctor team There is no doubt that this place has great infrastructure and great building. Well maintained corridors. Staffs are also very generous.",
        image: "/civil.svg",
    },
    {
        id: 3,
        name: "Vishal Singh",
        role: "Patient",
        feedback:
            "Hospital ho to AIIMS jaisa. As this hospital helped me and my family in the conditions where we were unable to do something about it. Every thing is in order here, i know that every hospital has some things that we are not happy about.",
        image: "/hygine.svg",
    },
];

const Testimonials = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className="py-12 bg-green-50 dark:bg-gray-900 rounded-lg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Heading */}
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-green-500 mb-6">
                    Testimonials
                    <Separator className="bg-gray-300 dark:bg-gray-600 mx-auto mt-2 w-20 sm:w-24 h-[2px]" />
                </h2>

                {/* Description */}
                <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 text-left max-w-3xl mx-auto mt-4 mb-10 sm:mb-12 leading-relaxed">
                    Our faithful testimonials reflect the heart of our
                    commitment—satisfied patients sharing their positive
                    experiences. At SANTUSHT, real stories testify to our
                    compassionate care, effective solutions, and the dedication
                    of our staff. Trust in our services is built on the genuine
                    voices of those we've served.
                </p>

                {/* Animated Testimonials */}
                {mounted && (
                    <AnimatedTestimonials
                        testimonials={testimonials.map((t) => ({
                            key: t.id.toString(),
                            quote: t.feedback,
                            name: t.name,
                            designation: t.role,
                            src: t.image,
                        }))}
                        autoplay={true}
                    />
                )}
            </div>
        </section>
    );
};

export default Testimonials;
